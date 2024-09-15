import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

// Mapeo de nombres para tus rutas
const breadcrumbNameMap = {
  "/app/dashboard": "Dashboard",
  "/app/clients": "Clients",
  "/app/employes": "Employees",
  "/app/vehicles": "Vehicles",
  "/app/requests": "Requests",
  "/app/routes": "Routes",
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

export default function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography key={to} color="textPrimary">
            {breadcrumbNameMap[to] || value}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to] || value}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}
