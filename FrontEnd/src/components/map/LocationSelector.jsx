import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Snackbar,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Slide from "@mui/material/Slide";

const LocationSelector = ({ open, onClose, onSelect }) => {
  const [position, setPosition] = useState(null); // Ubicación inicial
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [address, setAddress] = useState(""); // Estado para la dirección
  const [locationName, setLocationName] = useState(""); // Nombre de la dirección

  useEffect(() => {
    if (open) {
      setLoading(true); // Comienza la carga al abrir el modal
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          fetchAddress(latitude, longitude); // Obtener dirección inicial
          setLoading(false); // Finaliza la carga
        },
        () => {
          setError("No se pudo obtener la ubicación. Asegúrate de tener acceso a la geolocalización.");
          setSnackbarOpen(true);
          setLoading(false); // Finaliza la carga incluso si hay un error
        }
      );
    }
  }, [open]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setLocationName(data.display_name || "Ubicación desconocida"); // Establece el nombre de la ubicación
    } catch (error) {
      setError("No se pudo obtener la dirección.");
      setSnackbarOpen(true);
    }
  };

  const handleMapClick = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]); // Actualiza la posición del marcador al hacer clic en el mapa
    fetchAddress(event.latlng.lat, event.latlng.lng); // Obtener dirección del punto clickeado
  };

  const handleSelect = () => {
    onSelect(markerPosition); // Devuelve la posición seleccionada al formulario
    onClose(); // Cierra el modal
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter" && address) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMarkerPosition([lat, lon]);
        setPosition([lat, lon]);
        fetchAddress(lat, lon); // Obtener dirección de la nueva ubicación
      } else {
        setError("No se encontró la dirección");
        setSnackbarOpen(true);
      }
    }
  };

  const DraggableMarker = () => {
    return (
      <Marker
        position={markerPosition}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const marker = event.target;
            const newPos = marker.getLatLng(); // Obtiene la nueva posición del marcador
            setMarkerPosition([newPos.lat, newPos.lng]); // Actualiza la posición del marcador
            fetchAddress(newPos.lat, newPos.lng); // Obtener dirección de la nueva ubicación
          },
        }}
      >
        <Popup>
          <Typography variant="body2">{locationName}</Typography> {/* Mostrar nombre de la ubicación */}
        </Popup>
      </Marker>
    );
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: {
              xs: "90%", // 90% en pantallas pequeñas
              sm: "80%", // 80% en pantallas medianas
              md: "60%", // 60% en pantallas grandes
            },
            height: "80%",
            mx: "auto",
            mt: "5%",
            bgcolor: "background.paper", // Fondo blanco
            borderRadius: 2,
            boxShadow: 24,
            p: 0, // Sin padding para que el mapa ocupe todo el espacio
          }}
        >
          {loading ? ( // Mostrar el indicador de carga solo si loading es true
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CircularProgress /> {/* Indicador de carga */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Cargando mapa...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ position: "relative", height: "100%" }}>
              
              <MapContainer
                center={position}
                zoom={20}
                style={{ height: "100%", width: "100%" }}
                onClick={handleMapClick}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <DraggableMarker /> {/* Marcador arrastrable */}
              </MapContainer>
              <Button
                onClick={handleSelect}
                variant="contained"
                color="primary"
                sx={{
                  position: "absolute",
                  bottom: 16, // Distancia desde la parte inferior
                  right: 16, // Distancia desde la derecha
                  zIndex: 1000, // Asegúrate de que el botón esté por encima del mapa
                }} // Estilo para colocar el botón en la esquina inferior derecha
              >
                Seleccionar Ubicación
              </Button>
            </Box>
          )}
         
        </Box>
      </Slide>
    </Modal>
  );
};

export default LocationSelector;
