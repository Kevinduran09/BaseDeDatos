import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'   
import { RouterApp } from './components/router/RouterApp.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthProvider } from './Providers/AuthProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterApp />    
    </AuthProvider>
  </React.StrictMode>
)
