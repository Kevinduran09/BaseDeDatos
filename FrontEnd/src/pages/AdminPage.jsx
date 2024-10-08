import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../layout/Sidebar";
import "../styles/index.css";
import { toggleTheme } from "../utils/functions";
import { AdminLayout } from "../layout/AdminLayout";
import { useThemeStore } from "../store/useThemeStore";
export const AdminPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  return (
    <div>
      <div
        className={`container-app ${sidebarOpen ? "sidebarState active" : ""}`}
      >
        <Sidebar
          theme={theme}
          setTheme={setTheme}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <AdminLayout title={"Prueba"} />
      </div>
    </div>
  );
};
