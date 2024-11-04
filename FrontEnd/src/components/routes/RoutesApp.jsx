import React from "react";
import { MainPage } from "../../pages/MainPage";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { AccountPage } from "../../pages/AccountPage";
import { AdminPage } from "../../pages/AdminPage";
import { FormLayout } from "../../pages/FormLayout";
import { Client } from "../client/Client";
import { Employe } from "../employe/Employe";
import { Vehicle } from "../vehicle/Vehicle";
import { Viaje } from "../route/Viaje";
import { Solicitud } from "../request/Solicitud";
import { useRoutes } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { ErrorRoute } from "./ErrorRoute";
import { ProtectedRouter } from "./ProtectedRouter";
import { ClientDetailForm } from "../client/ClientDetailForm";
import { EmployeDetailForm } from "../employe/EmployeDetailForm";
import { VehicleDetailForm } from "../vehicle/VehicleDetailForm";
export const RoutesApp = () => {
  const { isAuthenticated, currentUser } = useAuthStore();
  const routes = [
    {
      path: "/",
      element: currentUser!=null? <MainPage /> : <Navigate to="app" />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element:  <RegisterPage />,
    },
    {
      path: "/user",
      element: (
      
       <AccountPage />
    
      ),
    },
    { path: "/*", element: <Navigate to="/" /> },
    {
      path: "/app",
      element: (
          <AdminPage />
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "clients/:id", element: <ClientDetailForm /> },
        { path: "clients", element: <Client /> },
        { path: "employes", element: <Employe /> },
        { path: "employes/:id", element: <EmployeDetailForm /> },
        { path: "vehicles", element: <Vehicle /> },
        { path: "vehicles/:id", element: <VehicleDetailForm /> },
        { path: "requests", element: <Solicitud /> },
        { path: "routes", element: <Viaje /> },

        { path: "*", element: <ErrorRoute /> },
      ],
    },
  ];
  const routesElements = useRoutes(routes);
  return routesElements;
};
