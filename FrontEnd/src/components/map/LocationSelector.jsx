import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LocationSelector = ({ open, onClose, onSelect }) => {
  const [position, setPosition] = useState(null); // Ubicación inicial
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    if (open) {
      setLoading(true); // Comienza la carga al abrir el modal
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          setLoading(false); // Finaliza la carga
        },
        () => {
          console.error("No se pudo obtener la ubicación.");
          setLoading(false); // Finaliza la carga incluso si hay un error
        }
      );
    }
  }, [open]);

  const handleMapClick = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]); // Actualiza la posición del marcador al hacer clic en el mapa
  };

  const handleSelect = () => {
    onSelect(markerPosition); // Devuelve la posición seleccionada al formulario
    onClose(); // Cierra el modal
  };

  // Manejar el arrastre del marcador
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
          },
        }}
      >
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          p: 2, // Padding
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
          <>
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
              sx={{ mt: 2, width: "100%" }} // Botón ocupa el 100% del ancho
            >
              Seleccionar Ubicación
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default LocationSelector;
