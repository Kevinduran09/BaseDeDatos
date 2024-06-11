import { NavLink, useLocation } from "react-router-dom";
import '../../styles/main.css';
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
const entries = [
  { title: 'Clientes', link: 'clients', icon: "fa-solid fa-user" },
  { title: 'Empleados', link: 'employes', icon: "fa-solid fa-helmet-safety" },
  { title: 'Vehiculos', link: 'vehicles', icon: "fa-solid fa-truck" },
  { title: 'Solicitudes', link: 'requests', icon: "fa-solid fa-bell" },
];

export const NavBar = () => {
  const locate = useLocation();

  let title = '';

  switch (locate.pathname) {
    case '/admin/clients':
      title = 'Registro de Clientes';
      break;
    case '/admin/employes':
      title = 'Registro de Empleados';
      break;
    case '/admin/vehicles':
      title = 'Registro de Vehiculos';
      break;
    case '/admin/requests':
      title = 'Registro de Solicitudes';
      break;
    default:
      title = 'Texto no definido';
      break;
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
              {entries.map((entry, index) => (
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
            <Button endIcon={<LogoutIcon />} variant="contained" color="error" >Cerrar Sesion</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
