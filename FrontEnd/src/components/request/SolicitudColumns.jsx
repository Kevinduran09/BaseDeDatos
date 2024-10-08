import React from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { UpdateButton } from "../buttons/UpdateButton";

export const SolicitudColumns = () => {
  const columns = [
    { field: "idSolicitud", headerName: "ID", width: 50 },
    {
      field: "idCliente",
      headerName: "Cliente",
      width: 150,
      renderCell: (params) => params.row.cliente.nombre,
    },
    {
      field: "idServicio",
      headerName: "Servicio",
      width: 200,
      renderCell: (params) => params.row.servicio.tipoServicio,
    },
    {
      field: "idDireccion",
      headerName: "Destino",
      width: 259,
      renderCell: (params) => params.row.cliente.direccion,
    },
    { field: "fecha", headerName: "Fecha", width: 150 },
    { field: "observacion", headerName: "Observación", width: 150 },
    { field: "estado", headerName: "Estado", width: 150 },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton
            handleDelete={() => console.log(params.row.idSolicitud)}
          />
        </>
      ),
    },
    {
      field: "editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          <UpdateButton handleUpdate={() => console.log(params.row)} />
        </>
      ),
    },
  ];

  return { columns };
};
