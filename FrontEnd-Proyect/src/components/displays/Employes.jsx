import React, { useState, useEffect } from 'react'
import CustomModal from './CustomModal';
import { ClientsTable } from '../client/ClientsTable';
import empleados from '../../mucks/empleados'
import { Actions } from '../helpers/Actions';
import { EmployForm } from '../forms/EmployForm'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs';
export const Employes = () => {
    const { register, handleSubmit, formState: { errors },reset, control, setValue } = useForm();
    const [employes, setEmplyes] = useState([]);
    const onSubmit = (data) => {

        data["fechaNacimiento"] = dayjs(data.fechaNacimiento).format('YYYY-MM-DD')
        data["fechaContratacion"] = dayjs(data.fechaContratacion).format('YYYY-MM-DD')
        console.log(data);
        // reset()
    }
    useEffect(() => {
        // fetchClients();
        setEmplyes(empleados)
    }, []);
    const resetForm = () => reset()
    const fetchClients = async () => {
        try {
            const response = await getClients();
            const data = response.data.data || []
            setEmplyes(data);
        } catch (error) {
            console.error(error);

        }
    };
    const selectedClient = (client) => {
        Object.keys(client).forEach(key => {
            setValue(key, client[key])
        })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'puesto', headerName: 'Puesto', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'cedula', headerName: 'Cedula', width: 150 },
        { field: 'correoElectronico', headerName: 'Email', width: 150},
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'direccion', headerName: 'Direccion', width: 150 },
        { field: 'fechaNacimiento', headerName: 'FechaNacimiento', align: 'right', width: 150 },
        { field: 'fechaContratacion', headerName: 'FechaContratacion', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (<>
                <Actions {...{ params }} editFuntion={selectedClient} />
            </>)
        }
    ];

    return (
        <>
            <div className="container-fluid mt-3">
                <ClientsTable data={employes} columns={columns} />
                <CustomModal
                    reset={resetForm}
                    form={'employ-form'}
                    title="Formulario Empleado"
                    content={<EmployForm control={control}  handleSave={handleSubmit(onSubmit)} errors={errors} register={register} />}
                />
            </div>
        </>
    );
}
