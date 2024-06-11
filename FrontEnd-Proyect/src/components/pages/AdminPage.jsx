import React from 'react'
import { NavBar } from '../tablecomponents/NavBar'
import { Route, Routes,Navigate} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Client } from '../displays/Client'
import { Employes } from '../displays/Employes'
import { Vehicle } from '../displays/Vehicle'
export const AdminPage = () => {
    return (

        <div className="App">
            <>
                <div className="container-fluid  justify-content-md-start bg-dark text-white p-3">

                    <div className="col-12">
                        <div className="h2 text-start ms-5">Transportes Yabi</div>
                    </div>
                </div>
            </>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path='/' element={<Navigate to='/admin/clients' />} />
                    <Route path='/clients' exact={true} Component={Client} />
                    <Route path='/employes' exact={true} Component={Employes} />
                    <Route path='/vehicles' exact={true} Component={Vehicle} />
                    <Route path='/requests' exact={true} Component={Client} />
                    
                </Routes>
                
            </div>
        </div>

    )
}
