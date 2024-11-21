import React, { useEffect,useState } from "react";

import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import YabiLogo from "../../assets/YabiLogo.png";
import { SolicitudFormulario } from "../SolicitudServicio/SolicitudFormulario";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
                    <NavLink onClick={handleOpen}>Solicitar Servicio</NavLink>
                  </li>
                  <li className="nav-list-item">
                    <NavLink to={'/account'}>Mi Cuenta</NavLink>
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

      <SolicitudFormulario open={open} handleClose={handleClose} />
    </>
  );
};
