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

import "../styles/sidebar.css";
export function Sidebar({ sidebarOpen, setSidebarOpen, setTheme, theme }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const CambiarTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
          {linksArray.map(({ icon, label, to }) => (
            <div className="link-container" key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `links${isActive ? ` active` : ``}`
                }
              >
                <div className="link-icon">{icon}</div>
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="divider" />
        {secondarylinksArray.map(({ icon, label, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

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
    to: "routes",
  },
];
const secondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "null",
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    to: "null",
  },
];
