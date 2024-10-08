import React from "react";
import { Outlet } from "react-router-dom";
import RouterBreadcrumbs from "../components/routes/RouterBreadcrumbs";
import { useThemeStore } from "../store/useThemeStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export const AdminLayout = ({ title, component = null }) => {
  const { theme } = useThemeStore();
  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h6: {
        fontSize: "1.25rem",
        fontWeight: 600, // Puedes aumentar el peso
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      label: {
        fontSize: "1rem",
        fontWeight: 500,
      },
    },
  });
  return (
    <div className="adminLayout-content">
      {/* Header */}
      <div className="header">
        <RouterBreadcrumbs />
        <div className="w-100 d-flex p-2" style={{ marginLeft: "30%" }}>
          <h2 className="fs-1">{title}</h2>
        </div>
      </div>
      <div className="main">
        <ThemeProvider theme={customTheme}>
          <Outlet />
        </ThemeProvider>
      </div>
    </div>
  );
};
