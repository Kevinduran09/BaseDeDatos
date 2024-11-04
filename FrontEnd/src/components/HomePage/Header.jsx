import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import YabiLogo from "../../assets/YabiLogo.png";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();


  useEffect(()=>{
  },[isAuthenticated])

  return (
    <>
      <header>
        <nav className="contenedor navbarsec">
          <div>
            <div className="d-flex align-items-center ms-3 mt-2">
              <NavLink to={"/"}>
                <img src={YabiLogo} alt="Yabi Logo" className="logo-image" />
              </NavLink>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <ul>
              {isAuthenticated ? (
                <>
                  <li className="nav-list-item">
                    <NavLink to="/client/Solicitar">Solicitar Servicio</NavLink>
                  </li>
                  <li className="nav-list-item">
                    <NavLink onClick={() => logout()}>Cerrar Sesion</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-list-item">
                  <NavLink to="/Login">Ingresar</NavLink>
                </li>
              )}
              <li className="nav-list-item">Nosotros</li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
