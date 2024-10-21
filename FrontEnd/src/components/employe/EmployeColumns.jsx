import React from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { UpdateButton } from "../buttons/UpdateButton";
import { useEmployeActions } from "./handler/useEmployeActions";
export const EmployeColumns = () => {
  const { deleteEmpleado, hanleEmpleadoDetail } = useEmployeActions();

  const columns = [
    { field: "idEmpleado", headerName: "ID", width: 50 },
    {
      field: "puesto",
      headerName: "Puesto",
      width: 150,
      renderCell: (params) => <>{params.row.puesto.cargo}</>,
    },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "cedula", headerName: "Cedula", width: 150 },
    { field: "correoElectronico", headerName: "Email", width: 150 },
    { field: "telefono", headerName: "Telefono", width: 150 },
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
        <>
          <DeleteButton handleDelete={deleteEmpleado} id={params.row.id} />
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
            handleUpdate={hanleEmpleadoDetail}
            id={params.row.idCliente}
          />
        </>
      ),
    },
  ];
  return { columns };
};
