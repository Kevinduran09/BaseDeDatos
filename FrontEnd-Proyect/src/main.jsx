import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterApp } from "./RouterApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Sidebar } from "./layout/Sidebar";
const App = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
