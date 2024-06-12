import React, { Fragment , useContext } from 'react';
import '../../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthContext';
export const Navbar = () => {
  const isLogged = useContext(AuthContext);

  return (
    <Fragment>
      <nav className='contenedor navbarsec'>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <img src='../../' alt="" />
        </a>
        <ul>
          {isLogged && <li className='nav-list-item'>  <NavLink to="/client/Solicitar">Solicitar Servicio </NavLink></li>}
          <li className='nav-list-item'> <NavLink to="/client/Login"> Ingresar </NavLink></li>
          <li className='nav-list-item'>Nosotros</li>
        </ul>
      </nav>
    </Fragment>
  );
};

