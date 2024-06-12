import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal';
import { ClientsTable } from '../client/ClientsTable';
import { Actions } from '../helpers/Actions';
import { VehicleForm } from '../forms/VehicleForm';
import { useForm } from 'react-hook-form';
import vehiculos from '../../mucks/vehiculos'
export const Vehicle = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue,control } = useForm();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(vehiculos)
    }, []);

    const fetchVehicles = async () => {
        try {
            // const response = await getVehicles(); // Assuming getVehicles is an API call to fetch vehicle data
            const data = response.data.data || [];
            setVehicles(data);
        } catch (error) {
            console.error(error);
        }
    };
    const resetForm = () => reset()
    const handleSave = (data) => {
        // Logic to save the vehicle data
        console.log(data);
        reset();
        // Additional logic to save the data (e.g., API call)
    };
    const selectedVehicle = (vehicle) => {
        console.log(vehicle);
        Object.keys(vehicle).forEach(key => {
            setValue(key, vehicle[key])
        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'tipoVehiculo', headerName: 'Tipo', width: 150 },
        { field: 'placa', headerName: 'Placa', width: 150 },
        { field: 'capacidad', headerName: 'Capacidad', width: 150 },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
        { field: 'fechaCompra', headerName: 'Fecha de Compra', width: 150 },
        { field: 'anoVehiculo', headerName: 'Año', width: 150 },
        { field: 'fichaTecnica', headerName: 'Ficha Técnica', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (
                <>
                    <Actions {...{params}} editFuntion={selectedVehicle} />
                </>
            )
        }
    ];

    return (
        <div className="container-fluid mt-3">
            <ClientsTable data={vehicles} columns={columns} />
            <CustomModal
                form={'vehicle-form'}
                reset={resetForm}
                title="Formulario de Vehículo"
                content={<VehicleForm handleSave={handleSubmit(handleSave)} errors={errors} control={control} register={register} />}
            />
        </div>
    );
};
