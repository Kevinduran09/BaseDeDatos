import React, { useState, useEffect} from 'react';
import CustomModal from './CustomModal';
import { getClients } from '../../../Api/ClientAPI';
import { ClientsTable } from '../client/ClientsTable';
import clientes from '../../mucks/clientes'
import { Actions } from '../helpers/Actions';
import { ClientForm } from '../forms/ClientForm';
import { useForm } from 'react-hook-form'
export const Client = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();
    const [clients, setClients] = useState([]);
    const onSubmit = (data) => {
        console.log(data);
        reset()
    }
    useEffect(() => {
        // fetchClients();
        setClients(clientes)
    }, []);
    const resetForm = () => reset()
    const fetchClients = async () => {
        try {
            const response = await getClients();
            const data = response.data.data || []
            setClients(data);
        } catch (error) {
            console.error(error);

        }
    };

    const selectedClient = (client) => {
        console.log(client);
        Object.keys(client).forEach(key => {
            setValue(key, client[key])
        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'cedula', headerName: 'Cedula', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'correoElectronico', headerName: 'Email', width: 150 },
        { field: 'direccion', headerName: 'Direccion', width: 150 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (<>
                <Actions {...{ params }} editFuntion={selectedClient} />
            </>)
        }
    ];


    return (
        <>
            <div className="container-fluid mt-3">
                <ClientsTable data={clients} columns={columns} />
                <CustomModal
                    form={'client-form'}
                    reset={resetForm}
                    title="Formulario Cliente"
                    content={<ClientForm handleSave={handleSubmit(onSubmit)} errors={errors} register={register} />}
                />
            </div>
        </>
    );
}
