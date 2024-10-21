import React from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { UpdateButton } from "../buttons/UpdateButton";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useClientActions } from "./handler/useClientActions";
export const ClientColumns = () => {
  const { deleteCliente, hanleClientDetail } = useClientActions();
  const columns = [
    {
      field: "idCliente",
      headerName: "ID",
      width: 50,
    },
    { field: "cedula", headerName: "Cedula", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "correoElectronico", headerName: "Email", width: 150 },
    { field: "direccion", headerName: "Dirección", width: 150 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton handleDelete={deleteCliente} id={params.row.id} />
        </>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          <UpdateButton
            handleUpdate={hanleClientDetail}
            id={params.row.idCliente}
          />
        </>
      ),
    },
  ];

  return { columns };
};
