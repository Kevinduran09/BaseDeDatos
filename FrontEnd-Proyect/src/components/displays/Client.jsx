import React, { useState,useEffect } from 'react'

import CustomModal from './CustomModal';
import { getClients } from '../../../Api/ClientAPI';
import { ClientsTable } from '../client/ClientsTable';
import clientes from '../../mucks/clientes'
import { Actions } from '../helpers/Actions';
import { ClientForm } from '../forms/ClientForm';
export const Client = () => {
    const [modalContent, setModalContent] = useState("Contenido dinámico");
    const [clients, setClients] = useState([]);
    useEffect(() => {
        // fetchClients();
        setClients(clientes)
    }, []);

    const fetchClients = async () => {
        try {
            const response = await getClients();
            const data = response.data.data || []
            setClients(data);
        } catch (error) {
            console.error(error);
           
        }
    };
    const handleSave = () => {
        // Lógica para guardar cambios
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'cedula', headerName: 'Cedula', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'correoElectronico', headerName: 'Email', width: 150 },
        { field: 'direccion', headerName: 'Direccion', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (<>
                <Actions {...{ params }} />
            </>)
        }
    ];


    return (
        <>
            <div className="container-fluid mt-3">
                <ClientsTable data={clients} columns={columns} />                
                <CustomModal
                    title="Modal title"
                    content={<ClientForm/>}
                    onSave={handleSave}
                    onClose={() => setModalContent("")}
                />
            </div>
        </>
    );
}
