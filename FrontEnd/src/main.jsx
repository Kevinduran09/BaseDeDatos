import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App.jsx";
import MapComponent from "./components/map/MapComponent.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapComponent />
  </StrictMode>
);
