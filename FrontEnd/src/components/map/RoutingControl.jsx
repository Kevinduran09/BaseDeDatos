import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, waypoints, color }) => {
  const instance = L.Routing.control({
    position,
    collapsible: true,
    waypoints: waypoints,
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
    addWaypoints: false,
    createMarker: function () {
      return null;
    }
  });

  // Manejo de eventos de eliminación y limpieza
  instance.on('remove', function () {
    if (instance._line) {
      instance._clearLines(); // Limpia las rutas de forma segura
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
