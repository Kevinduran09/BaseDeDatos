import React, { Fragment } from 'react';
import '../../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import YabiLogo from '../../assets/YabiLogo.png';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Fragment>
      <nav className='contenedor navbarsec'>
        <div>
          <div className='d-flex align-items-center ms-3 mt-2'>
            <NavLink to={'/client'}>
              <img src={YabiLogo} alt="Yabi Logo" className="logo-image" />
            </NavLink>
          </div>
        </div>
       <div className="d-flex align-items-center">
          <ul>
            {isAuthenticated ? (
              <>
                <li className='nav-list-item'><NavLink to="/client/Solicitar">Solicitar Servicio</NavLink></li>
                <li className='nav-list-item'><NavLink to="/client" onClick={logout}>Cerrar Sesion</NavLink></li>
              </>
            ) : (
              <li className='nav-list-item'><NavLink to="/client/Login">Ingresar</NavLink></li>
            )}
            <li className='nav-list-item'>Nosotros</li>
          </ul>
       </div>
      </nav>
    </Fragment>
  );
};
