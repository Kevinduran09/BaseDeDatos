import React, { Fragment } from 'react'
import '../../styles/Navbar.css'
import { NavLink, Outlet } from 'react-router-dom'

export const Navbar = () => {
  return (
    <Fragment>
    <nav className='contenedor'>
     <ul>
        <li>Solicitar Servicio</li>
        <li> <NavLink to="/Login"> Ingresar </NavLink></li>
        <li>Nosotros</li>
     </ul>
    </nav>
    <Outlet/>
    </Fragment>
  )
}