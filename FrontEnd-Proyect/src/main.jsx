import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { LandingPage } from './components/pages/LandingPage.jsx'
import { AdminPage } from './components/pages/AdminPage.jsx'
import { RouterApp } from './components/router/RouterApp.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterApp />    
  </React.StrictMode>
)
