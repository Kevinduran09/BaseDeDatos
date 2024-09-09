import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "../tablecomponents/NavBar";
import { Client } from "../displays/Client";
import { Employes } from "../displays/Employes";
import { Vehicle } from "../displays/Vehicle";
import { Solicitud } from "../displays/Solicitud";
import { RecorridoForm } from "../forms/RecorridoForm";
import { Viaje } from "../displays/viaje";
import { ShowViaje } from "../forms/ShowViaje";
import { ShowRecorrido } from "../forms/ShowRecorrido";
import { ShowSolicitud } from "../forms/ShowSolicitud";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const { isAuthenticated, currentUser } = useAuthStore();
  const navegate = useNavigate();
  if (!isAuthenticated) {
    navegate("/client");
  }

  return (
    <div className="App">
      <NavBar />
      <div className="content">
        {isAuthenticated && (
          <Routes>
            {currentUser.role === "Administrador" && (
              <>
                <Route path="/" element={<Navigate to="/admin/clients" />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/employes" element={<Employes />} />
                <Route path="/vehicles" element={<Vehicle />} />
                <Route path="/requests" element={<Solicitud />} />
                <Route path="/request/:id" element={<RecorridoForm />} />
                <Route path="/viajes" element={<Viaje />} />
                <Route path="/viaje/:id" element={<ShowViaje />} />
                <Route path="/recorrido/:id" element={<ShowRecorrido />} />
                <Route path="/Solicitud/:id" element={<ShowSolicitud />} />
              </>
            )}
            {currentUser.role === "Chofer" && (
              <>
                <Route path="/" element={<Navigate to="/admin/viajes" />} />
                <Route path="/viajes" element={<Viaje />} />
                <Route path="/viaje/:id" element={<ShowViaje />} />
                <Route path="/recorrido/:id" element={<ShowRecorrido />} />
              </>
            )}
          </Routes>
        )}
      </div>
    </div>
  );
};
