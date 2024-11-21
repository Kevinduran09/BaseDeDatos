import React from "react";
import { useEmployeeActions } from "./handler/useEmployeActions";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButton";
import { Delete02Icon } from 'hugeicons-react';
import { PencilEdit02Icon } from 'hugeicons-react';
export const EmployeColumns = () => {
  const { deleteEmpleado } = useEmployeeActions();
  const navigate = useNavigate(); 
  const columns = [
    { field: "idEmpleado", headerName: "ID", width: 50 },
    {
      field: "puesto",
      headerName: "Puesto",
      width: 150,
      renderCell: (params) => <>{params.row.cargo}</>,
    },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "cedula", headerName: "Cedula", width: 150 },
    { field: "correoElectronico", headerName: "Email", width: 150 },
    { field: "telefonoMovil", headerName: "Telefono", width: 150 },
    { field: "direccion", headerName: "Direccion", width: 150 },
    {
      field: "fechaNacimiento",
      headerName: "FechaNacimiento",
      align: "right",
      width: 150,
    },
    {
      field: "fechaContratacion",
      headerName: "FechaContratacion",
      width: 150,
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <CustomButton
          icon={<Delete02Icon
            size={24}
            color={"#ffffff"}
            variant={"stroke"}
          />}
          disabled={params.row.cargo == 'Administrador' ? true : false}
          action={() => deleteEmpleado(params.row.idEmpleado)} // Acción de eliminación
          text="Eliminar"
          color="error"
          variant="contained"
        />
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <CustomButton
          icon={<PencilEdit02Icon
            size={24}
            color={"#ffffff"}
            variant={"stroke"}
          />}
          action={() => navigate(`edit/${params.row.idEmpleado}`)} // Redirección a la edición
          text="Editar"
          color="primary"
          variant="contained"
        />
      ),
    },
  ];
  return { columns };
};
