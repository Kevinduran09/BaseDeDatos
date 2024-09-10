import React from "react";
import { LandingPage } from "../../pages/Client";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/";
import from 'zustand'
export const routes = () => {
  const { isAuthenticated, currentUser } = useAuthStore();
  const routes = [
    {
      path: "/",
      element: <LandingPage />,
      children: [
        {
          path: "/login",
          element: isAuthenticated ? <Navigate to="/" /> : <LoginLayout />,
        },
        {
          path: "/register",
          element: isAuthenticated ? <Navigate to="/" /> : <RegisterLayout />,
        },
        {
          path: "/user",
          element: isAuthenticated ? <UserLayout /> : <Navigate to={"/"} />,
        },
      ],
    },
    {
      path: "/app",
      element:
        isAuthenticated && currentUser.admin ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        {
          path: "/client",
          element: <Client />,
          children: [{ path: "/:id", element: <FormLayout /> }],
        },
        {
          path: "/employes",
          element: <Employes />,
          children: [{ path: "/:id", element: <FormLayout /> }],
        },
        {
          path: "/vehicles",
          element: <Vehicle />,
          children: [{ path: "/:id", element: <FormLayout /> }],
        },
        {
          path: "/requests",
          element: <Solicitud />,
          children: [{ path: "/:id", element: <FormLayout /> }],
        },
        {
          path: "/viaje",
          element: <Viaje />,
          children: [{ path: "/:id", element: <FormLayout /> }],
        },

        { path: "/", element: <Navigate to="/app/dashboard" /> },
      ],
    },
  ];
  return routes;
};
