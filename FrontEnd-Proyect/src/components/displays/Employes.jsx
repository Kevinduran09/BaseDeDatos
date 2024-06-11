import React, { useState, useEffect } from 'react'
import CustomModal from './CustomModal';
import { getClients } from '../../../Api/ClientAPI';
import { ClientsTable } from '../client/ClientsTable';
import empleados from '../../mucks/empleados'
import { Actions } from '../helpers/Actions';
import { alignProperty } from '@mui/material/styles/cssUtils';

export const Employes = () => {
    const [modalContent, setModalContent] = useState("Contenido dinámico");
    const [employes, setEmplyes] = useState([]);
    useEffect(() => {
        // fetchClients();
        setEmplyes(empleados)
        console.log(empleados);
    }, []);

    const fetchClients = async () => {
        try {
            const response = await getClients();
            const data = response.data.data || []
            setEmplyes(data);
        } catch (error) {
            console.error(error);

        }
    };
    const handleSave = () => {
        // Lógica para guardar cambios
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'puesto', headerName: 'Puesto', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'cedula', headerName: 'Cedula', width: 150 },
        { field: 'correoElectronico', headerName: 'Email', width: 150 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'direccion', headerName: 'Direccion', width: 150 },
        { field: 'fechaNacimiento', headerName: 'FechaNacimiento', align: 'right', width: 150 },
        { field: 'fechaContratacion', headerName: 'FechaContratacion', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (<>
                <Actions {...{ params }} />
            </>)
        }
    ];

    return (
        <>
            <div className="container-fluid mt-3">
                <ClientsTable data={employes} columns={columns} />
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
