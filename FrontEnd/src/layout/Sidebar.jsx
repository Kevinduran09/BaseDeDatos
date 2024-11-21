import logo from "../assets/YabiLogo.svg";
import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { FaTruckFront } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { FaRoute } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import "../styles/sidebar.css";
import Swal from "sweetalert2";

import { useAuthStore } from "../store/useAuthStore";
export function Sidebar({ sidebarOpen, setSidebarOpen, setTheme, theme }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { logout } = useAuthStore()
  const CambiarTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const { currentUser } = useAuthStore()

  const closeSession = (e) => {
 
    Swal.fire({
      title: "¿Desea cerrar su sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#015dfc",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  const isChofer = currentUser?.cargo === "Chofer";

  return (
    <div
      className={`sidebar-container ${sidebarOpen ? "active" : ""} ${theme}`}
    >
      <button className="sidebar-button" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="logo-content">
        <div
          className="img-content"
          style={{ height: `${sidebarOpen ? "5rem" : "1.5rem"}` }}
        >
          <img src={logo} alt="logo" />
        </div>
        {/* <h2>Yabi</h2> */}
      </div>
      <div className="content-navegation">
        <div className="navegation-list">
          {!isChofer && linksArray.map(({ icon, label, to }) => (
            <div className="link-container" key={label}>
              <NavLink to={to} className={({ isActive }) => `links${isActive ? ` active` : ``}`}>
                <div className="link-icon">{icon}</div>
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            </div>
          ))}
          {/* Si es chofer, solo mostrar "Mis Viajes" */}
          {isChofer && (
            <div className="link-container" key="Mis Viajes">
              <NavLink to="mis-viajes" className={({ isActive }) => `links${isActive ? ` active` : ``}`}>
                <div className="link-icon"><FaRoute /></div>
                {sidebarOpen && <span>Mis Viajes</span>}
              </NavLink>
            </div>
          )}
        </div>
        <div className="divider" />
        {!isChofer && secondarylinksArray.map(({ icon, label, to }) => (
          <div className="link-container" key={label}>
            <NavLink to={to} className={({ isActive }) => `links${isActive ? ` active` : ``}`}>
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

        <div className="link-container" key={'Salir'}>
          <NavLink
            className={'links exit'}
            style={{color:'black !important'}}
            onClick={closeSession}
          >
            <div className="link-icon"><MdLogout /></div>
            {sidebarOpen && <span>Salir</span>}
          </NavLink>
        </div>


        <div className="divider" />
        <div className="theme-content">
          {sidebarOpen && <span className="title-theme">Dark mode</span>}
          <div className="toggle-content">
            <div className="grid theme-container">
              <div className="content">
                <div className="demo">
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="theme-swither"
                      onClick={CambiarTheme}
                      checked={theme === "dark"}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const linksArray = [
  {
    label: "Clientes",
    icon: <BsPeopleFill />,
    to: "clients",
  },
  {
    label: "Empleados",
    icon: <GrUserWorker />,
    to: "employes",
  },
  {
    label: "Vehiculos",
    icon: <FaTruckFront />,
    to: "vehicles",
  },
  {
    label: "Solicitudes",
    icon: <TbReport />,
    to: "requests",
  },
  {
    label: "Viajes",
    icon: <FaRoute />,
    to: "travels",
  },
  {
    label: "Auditorias",
    icon: <FaAddressBook />,
    to: "auditorias",
  },
];
const secondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "config",
  },

];
