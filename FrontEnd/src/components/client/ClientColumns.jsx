import React from "react";
import { CustomButton } from "../CustomButton"; 
import { useClientActions } from "./handler/useClientActions";
import { useNavigate } from "react-router-dom";
import { Delete02Icon } from 'hugeicons-react';
import { PencilEdit02Icon } from 'hugeicons-react';
export const ClientColumns = () => {
  const { deleteCliente } = useClientActions();
  const navigate = useNavigate(); 

  const columns = [
    {
      field: "idCliente",
      headerName: "ID",
      width: 50,
    },
    { field: "cedula", headerName: "Cédula", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "correoElectronico", headerName: "Email", width: 150 },
    { field: "direccion", headerName: "Dirección", width: 150 },
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
          action={() => deleteCliente(params.row.id)}
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
          action={() => navigate(`edit/${params.row.idCliente}`)}
          text="Editar"
          color="primary"
          variant="contained"
        />
      ),
    },
  ];

  return { columns };
};
