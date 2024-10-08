import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import RoutingMachine from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([10.6346, -85.4402]); // Liberia
  const [end, setEnd] = useState([9.9281, -84.0907]); // San José

  return (
    <>
      <MapContainer
        center={[9.7489, -83.7534]} // Costa Rica
        zoom={8} // Ajustar zoom para ver toda la región
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={(map) => setMap(map)}
      >
        <RoutingMachine
          position={"topleft"}
          start={start}
          end={end}
          color={"#757de8"}
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default MapComponent;
