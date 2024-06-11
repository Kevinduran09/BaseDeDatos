import React, { useState, useEffect } from 'react'
import CustomModal from './CustomModal';
import { getClients } from '../../../Api/ClientAPI';
import { ClientsTable } from '../client/ClientsTable';
import vehiculosMock from '../../mucks/vehiculos';
import { Actions } from '../helpers/Actions';

export const Vehicle = () => {
    const [modalContent, setModalContent] = useState("Contenido dinámico");
    const [Vehicle, setVehicle] = useState([]);
    useEffect(() => {
        // fetchClients();
        setVehicle(vehiculosMock)
    }, []);

    const fetchClients = async () => {
        try {
            const response = await getClients();
            const data = response.data.data || []
            setVehicle(data);
        } catch (error) {
            console.error(error);

        }
    };
    const handleSave = () => {
        // Lógica para guardar cambios
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'tipoVehiculo', headerName: 'Tipo', width: 150 },
        { field: 'placa', headerName: 'Placa', width: 150 },
        { field: 'capacidad', headerName: 'Capacidad', width: 150 },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
        { field: 'fechaCompra', headerName: 'Fecha de Compra', width: 150 },
        { field: 'anoVehiculo', headerName: 'Año', width: 150 },
        { field: 'fichaTecnica', headerName: 'FichaTecnica', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (<>
                <Actions {...{ params }} />
            </>)
        }
    ];


    return (
        <>
            <div className="container-fluid mt-3">
                <ClientsTable data={Vehicle} columns={columns} />
                <CustomModal
                    title="Modal title"
                    content={modalContent}
                    onSave={handleSave}
                    onClose={() => setModalContent("")}
                />
            </div>
        </>
    );
}
