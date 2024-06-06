import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './styles/index.css'
import  {Navbar} from './components/LandingPageComponents/Navbar.jsx'
import { Hero } from './components/LandingPageComponents/Hero.jsx'
import { Servicios } from './components/LandingPageComponents/Servicios.jsx'
import { TituloServicios } from './components/LandingPageComponents/TituloServicios.jsx'
import { Login } from './components/LoginComponents/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Register} from './components/LoginComponents/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
     <Navbar/>
    <div className="content">
    <Hero/>
    <TituloServicios/>
    <Servicios/>
    </div>
    </BrowserRouter>
  </React.StrictMode>
)
