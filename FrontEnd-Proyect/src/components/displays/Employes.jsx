import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal';
import { TableComponent } from '../client/TableComponent';
import { Actions } from '../helpers/Actions';
import { EmployForm } from '../forms/EmployForm';
import { useForm } from 'react-hook-form';
import AdminAPI from '../../Api/AdminAPI';
import dayjs from 'dayjs';
import { show_option, showMsj, show_alert } from '../../functions';

export const Employes = () => {
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
    const [employes, setEmplyes] = useState([]);

    const onSubmit = async (data) => {
        data["fechaNacimiento"] = dayjs(data.fechaNacimiento).format('YYYY-MM-DD');
        data["fechaContratacion"] = dayjs(data.fechaContratacion).format('YYYY-MM-DD');
        try {
            console.log(data);
            let result = null;
            if (data.idEmpleado != '') {
                result = await AdminAPI.updateEmployee(data); // Usando AdminAPI para actualizar empleado
                showMsj('Actualizado con éxito el empleado');
            } else {
                result = await AdminAPI.createEmployee(data); // Usando AdminAPI para crear empleado
                showMsj('Creado con éxito el empleado');
            }
            fetchEmployees(); // Actualizar la lista después de crear o actualizar
        } catch (error) {
            console.error(error);
            show_alert({ icon: 'error', title: 'No se pudo crear/actualizar el empleado' });
        }
        reset();
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const resetForm = () => reset({
        idEmpleado: '',
        idPuesto: 0,
        nombre: '',
        apellido: '',
        cedula: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: null,
        fechaContratacion: null,
        nombreUsuario: '',
        contrasena: ''
    });

    const fetchEmployees = async () => {
        try {
            const response = await AdminAPI.getEmployes(); // Usando AdminAPI para obtener empleados
            const data = response.data || [];
            setEmplyes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const selectedEmployee = (employe) => {
        console.log(employe);
        Object.keys(employe).forEach(key => {
            setValue(key, employe[key]);
        });
        setValue('puesto', employe.idPuesto)
        if (employe.usuario != null) {
            setValue('nombreUsuario', employe.usuario.nombreUsuario)
            setValue('contrasena', employe.usuario.contrasena)
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const flag = await show_option('Eliminar', '¿Desea eliminar el empleado?', 'warning');
            if (flag) {
                const res = await AdminAPI.deleteEmployee(id); // Usando AdminAPI para eliminar empleado
                showMsj('Se eliminó con éxito');
                fetchEmployees(); // Actualizar la lista después de eliminar
            }
        } catch (error) {
            console.error(error);
            show_alert({ icon: 'error', title: 'No se pudo eliminar el empleado' });
        }
    };

    const columns = [
        { field: 'idEmpleado', headerName: 'ID', width: 50 },
        {
            field: 'puesto', headerName: 'Puesto', width: 150, renderCell: (params) => (
                <>
                    {params.row.puesto.cargo}
                </>
            )
        },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'cedula', headerName: 'Cedula', width: 150 },
        { field: 'correoElectronico', headerName: 'Email', width: 150 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'direccion', headerName: 'Direccion', width: 150 },
        { field: 'fechaNacimiento', headerName: 'FechaNacimiento', align: 'right', width: 150 },
        { field: 'fechaContratacion', headerName: 'FechaContratacion', width: 150 },
        {
            field: 'Edit', headerName: 'Editar', width: 100, renderCell: (params) => (
                <>
                    <Actions {...{ params }} editFuntion={selectedEmployee} deleteFunction={handleDeleteEmployee} />
                </>
            )
        }
    ];

    return (
        <>
            <div className="container-fluid mt-3">
                <TableComponent data={employes} columns={columns} reset={resetForm} />
                <CustomModal
                    reset={resetForm}
                    form={'employ-form'}
                    title="Formulario Empleado"
                    content={<EmployForm control={control} handleSave={handleSubmit(onSubmit)} errors={errors} register={register} />}
                />
            </div>
        </>
    );
};
