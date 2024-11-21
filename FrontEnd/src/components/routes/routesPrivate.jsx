import React from "react";
import { AdminPage } from "../../pages/AdminPage";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { Dashboard } from "../dashboard/Dashboard";
import { ClientDetailForm } from "../client/ClientDetailForm";
import { Client } from "../client/Client";
import { Employe } from "../employe/Employe";
import { EmployeeDetailForm } from "../employe/EmployeeDetailForm";
import { Vehicle } from "../vehicle/Vehicle";
import { VehicleDetailForm } from "../vehicle/VehicleDetailForm";
import { Solicitud } from "../request/Solicitud";
import { Viaje } from "../travels/Viaje";
import { ErrorRoute } from "./ErrorRoute";
import { SolicitudDetalle } from "../request/SolicitudDetalle";
import { ViajeEstablecerForm } from "../travels/ViajeEstablecerForm";
import ViajeDetalle from "../travels/ViajeDetalle";
import { Auditorias } from "../auditorias/Auditorias";
import { ConfiguracionDashboard } from "../ConfiguracionDashboard";
import { ViajesChofer } from "../travels/ViajesChofer";
import { SolicitudDetalleRecorrido } from "../request/SolicitudDetalleRecorrido";
import { Unauthorized } from "./Unauthorized";

export const routesPrivate = [
    {
        path: "/app",
        element: (
            <RoleBasedRoute
                element={<AdminPage />}
                allowedRoles={["Administrador", "Chofer"]}
            />
        ),
        children: [
            // Rutas para administradores
            { path: "dashboard", element: <RoleBasedRoute element={<Dashboard />} allowedRoles={["Administrador"]} /> },
            { path: "clients", element: <RoleBasedRoute element={<Client />} allowedRoles={["Administrador"]} /> },
            { path: "clients/create", element: <RoleBasedRoute element={<ClientDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "clients/edit/:id", element: <RoleBasedRoute element={<ClientDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "employes", element: <RoleBasedRoute element={<Employe />} allowedRoles={["Administrador"]} /> },
            { path: "employes/create", element: <RoleBasedRoute element={<EmployeeDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "employes/edit/:id", element: <RoleBasedRoute element={<EmployeeDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "vehicles", element: <RoleBasedRoute element={<Vehicle />} allowedRoles={["Administrador"]} /> },
            { path: "vehicles/create", element: <RoleBasedRoute element={<VehicleDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "vehicles/edit/:id", element: <RoleBasedRoute element={<VehicleDetailForm />} allowedRoles={["Administrador"]} /> },
            { path: "requests", element: <RoleBasedRoute element={<Solicitud />} allowedRoles={["Administrador"]} /> },
            { path: "requests/ver/:id", element: <RoleBasedRoute element={<SolicitudDetalle />} allowedRoles={["Administrador"]} /> },
            { path: "travels", element: <RoleBasedRoute element={<Viaje />} allowedRoles={["Administrador"]} /> },
            { path: "travels/establecer", element: <RoleBasedRoute element={<ViajeEstablecerForm />} allowedRoles={["Administrador"]} /> },
            { path: "travels/detalle/:id", element: <RoleBasedRoute element={<ViajeDetalle />} allowedRoles={["Administrador"]} /> },
            { path: "auditorias", element: <RoleBasedRoute element={<Auditorias />} allowedRoles={["Administrador"]} /> },
            { path: "config", element: <RoleBasedRoute element={<ConfiguracionDashboard />} allowedRoles={["Administrador"]} /> },

            // Rutas para choferes
            { path: "mis-viajes", element: <RoleBasedRoute element={<ViajesChofer />} allowedRoles={["Chofer"]} /> },
            { path: "mis-viajes/detalle/:id", element: <RoleBasedRoute element={<ViajeDetalle />} allowedRoles={["Chofer"]} /> },
            {
                path: "mis-viajes/detalle/:id/detalles-solicitud/:idSolicitud",
                element: <RoleBasedRoute element={<SolicitudDetalleRecorrido />} allowedRoles={["Chofer"]} />,
            },
          
            // Ruta para manejar rutas no encontradas
            { path: "*", element: <ErrorRoute /> },
        ],
        
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />, // Agrega la vista de acceso denegado
    },
];
