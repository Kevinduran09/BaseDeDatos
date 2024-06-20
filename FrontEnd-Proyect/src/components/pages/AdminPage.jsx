import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from '../tablecomponents/NavBar';
import { Client } from '../displays/Client';
import { Employes } from '../displays/Employes';
import { Vehicle } from '../displays/Vehicle';
import { Solicitud } from '../displays/Solicitud';
import { RecorridoForm } from '../forms/RecorridoForm';
import { Viaje } from '../displays/viaje';
import { ShowViaje } from '../forms/ShowViaje';
import { ShowRecorrido } from '../forms/ShowRecorrido';
import { ShowSolicitud } from '../forms/ShowSolicitud';

export const AdminPage = () => {
    // Obtener la información del usuario directamente desde sessionStorage
    const storedAuth = JSON.parse(sessionStorage.getItem('current'));
    const userRole = storedAuth?.cargo;
    const isAuthenticated = !!storedAuth;

    // Función para redirigir si no está autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            <Navigate to="/client" />;
        }
    }, [isAuthenticated]);

    return (
        <div className="App">
            <div className="container-fluid justify-content-md-start bg-dark text-white p-3">
                <div className="col-12">
                    <div className="h2 text-start ms-5">Transportes Yabi</div>
                </div>
            </div>
            <NavBar />
            <div className="content">
                {isAuthenticated && (
                    <Routes>
                        {userRole === 'Administrador' && (
                            <>
                                <Route path="/" element={<Navigate to="/admin/clients" />} />
                                <Route path="/clients" element={<Client />} />
                                <Route path="/employes" element={<Employes />} />
                                <Route path="/vehicles" element={<Vehicle />} />
                                <Route path="/requests" element={<Solicitud />} />
                                <Route path="/request/:id" element={<RecorridoForm />} />
                                <Route path="/viajes" element={<Viaje />} />
                                <Route path="/viaje/:id" element={<ShowViaje />} />
                                <Route path="/recorrido/:id" element={<ShowRecorrido />} />
                                <Route path="/Solicitud/:id" element={<ShowSolicitud />} />

                            </>
                        )}
                        {userRole === 'Chofer' && (
                            <>
                                <Route path="/" element={<Navigate to="/admin/viajes" />} />
                                <Route path="/viajes" element={<Viaje />} />
                                <Route path="/viaje/:id" element={<ShowViaje />} />
                                <Route path="/recorrido/:id" element={<ShowRecorrido />} />
                            </>
                        )}
                    </Routes>
                )}
            </div>
        </div>
    );
};
