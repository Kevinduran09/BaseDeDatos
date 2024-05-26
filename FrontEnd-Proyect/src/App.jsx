import React from 'react'
import { NavBar } from './components/tablecomponents/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ClientsTable } from './components/tablecomponents/ClientsTable'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { OtroComponente } from './components/OtroComponente'
export const App = () => {
  return (
    <Router>
      <div className="App">
        <>
          <div className="row  justify-content-md-start bg-dark text-white p-3">
            
            <div className="col-12">
              <div className="h2 text-center">Transportes Yabi</div>
            </div>
          </div>
        </>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path='/' exact={true} Component={ClientsTable} />
            <Route path='/other' exact={true} Component={OtroComponente} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
