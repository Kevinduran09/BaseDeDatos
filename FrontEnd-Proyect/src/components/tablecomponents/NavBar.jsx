import { NavLink, useLocation } from "react-router-dom";
import '../../styles/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const entriesAdmin = [
  { title: 'Clientes', link: 'clients', icon: "fa-solid fa-user" },
  { title: 'Empleados', link: 'employes', icon: "fa-solid fa-helmet-safety" },
  { title: 'Vehiculos', link: 'vehicles', icon: "fa-solid fa-truck" },
  { title: 'Solicitudes', link: 'requests', icon: "fa-solid fa-bell" },
  { title: 'Viajes', link: 'viajes', icon: "fa-solid fa-bell" }
];

const entriesChofer = [
  { title: 'Viajes', link: 'viajes', icon: "fa-solid fa-bell" }
];

export const NavBar = () => {
  const locate = useLocation();
  const { isAuthenticated, logout, userRole } = useAuth();
  const navegate = useNavigate();

  let entriesToShow = [];
  let title = '';

  if (userRole === 'Chofer') {
    entriesToShow = entriesChofer;
  } else if (userRole === 'Administrador') {
    entriesToShow = entriesAdmin;
  }
  
  if (locate.pathname === '/admin/clients') {
    title = 'Registro de Clientes';
  } else if (locate.pathname === '/admin/employes') {
    title = 'Registro de Empleados';
  } else if (locate.pathname === '/admin/vehicles') {
    title = 'Registro de Vehículos';
  } else if (locate.pathname === '/admin/requests') {
    title = 'Registro de Solicitudes';
  } else if (locate.pathname === '/admin/viajes') {
    title = 'Registro de Viajes';
  } else if (/^\/admin\/solicitud\/\d+$/.test(locate.pathname)) {
    title = 'Información de Solicitud';
  } else if (/^\/admin\/recorrido\/\d+$/.test(locate.pathname)) {
    title = 'Información de Recorrido';
  } else if (/^\/admin\/viaje\/\d+$/.test(locate.pathname)) {
    title = 'Información de Viaje';
  } else {
    title = 'Ruta no encontrada';
  }

  return (
    <div className="container-fluid">
      <div className="row mt-3 justify-content-md-start shadow-sm p-3">
        <div className="col-2">
          <button className="btn ms-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <i className="fa-solid fa-bars fa-2xl"></i>
          </button>
        </div>
        <div className="col-8">
          <div className="h2 text-center">{title}</div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start bg-light" style={{ width: '300px' }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header m-3">
          <span className="h3 text-center">Administracion</span>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-light">
          <div className="sidebar">
            <ul style={{ width: '100%', paddingLeft: 0 }}>
              {entriesToShow.map((entry, index) => (
                <li key={index} className="list-group-item mb-3">
                  {/* Concatenar la ruta base de admin con la subruta */}
                  <NavLink className={({ isActive }) => isActive ? "text-decoration-none fs-6 py-3 rounded w-100 d-inline-block p-2 hover-effect d-flex align-items-center active" : "text-decoration-none fs-6 py-3 rounded w-100 d-inline-block p-2 hover-effect d-flex align-items-center"}
                    to={`/admin/${entry.link}`}>
                    <i className={`${entry.icon} me-4 fs-4`}></i>
                    <span className="fs-4">{entry.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-footer-nav">
            <Button onClick={() => {
              logout();
              navegate('/client');
            }} endIcon={<LogoutIcon />} variant="contained" color="error">Cerrar Sesion</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
