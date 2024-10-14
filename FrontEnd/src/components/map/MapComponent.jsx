import React, { useEffect, useState } from "react";
import L from "leaflet";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import Control from "leaflet-control-geocoder";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null); // Ubicación del usuario

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            if (map) {
              map.setView([latitude, longitude], 13); // Ajusta el zoom según necesites
            }
          },
          () => {
            console.error("No se pudo obtener la ubicación.");
          }
        );
      } else {
        console.error("Geolocalización no es compatible con este navegador.");
      }
    };

    getLocation();
  }, [map, position]);

  // Inicializa el buscador de ubicaciones
  useEffect(() => {
    if (map) {
      const geocoder = Control.geocoder({
        defaultMarkGeocode: true,
        placeholder: "Buscar ubicación...",
      }).on("markgeocode", (e) => {
        const { center } = e.geocode;
        setPosition([center.lat, center.lng]); // Actualiza la posición con la ubicación buscada
        map.setView(center, 13); // Centra el mapa en la ubicación buscada
      });

      map.addControl(geocoder); // Agrega el control al mapa
    }
  }, [map]);

  // No renderizar el mapa hasta que la posición esté disponible
  if (!position) {
    return <div>Cargando mapa...</div>; // O un componente de carga más elaborado
  }

  return (
    <MapContainer
      center={position}
      zoom={20}
      zoomControl={true}
      style={{ height: "100vh", width: "100%", padding: 0 }}
      whenCreated={setMap} // Al crear el mapa, establecerlo
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={maps.base}
      />
      <Marker position={position}>
        <Popup>Tu ubicación actual</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
