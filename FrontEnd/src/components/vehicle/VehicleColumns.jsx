import React from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { UpdateButton } from "../buttons/UpdateButton";
import { useVehicleActions } from "./handler/useVehicleActions";
export const VehicleColumns = () => {
  const { handleVehicleDetail, deleteVehicle } = useVehicleActions();
  const columns = [
    { field: "idVehiculo", headerName: "ID", width: 50 },
    { field: "tipoVehiculo", headerName: "Tipo", width: 150 },
    { field: "placa", headerName: "Placa", width: 150 },
    { field: "capacidad", headerName: "Capacidad", width: 150 },
    { field: "modelo", headerName: "Modelo", width: 150 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton
            handleDelete={deleteVehicle}
            id={params.row.idVehiculo}
          />
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
            handleUpdate={handleVehicleDetail}
            id={params.row.idVehiculo}
          />
        </>
      ),
    },
  ];

  return { columns };
};
