import React from "react";
import { useVehicleActions } from "./handler/useVehicleActions";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButton";
import { Delete02Icon } from 'hugeicons-react';
import { PencilEdit02Icon } from 'hugeicons-react';
export const VehicleColumns = () => {
  const { deleteVehiculo } = useVehicleActions();
  const navigate = useNavigate(); 
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
        <CustomButton
          icon={<Delete02Icon
            size={24}
            color={"#ffffff"}
            variant={"stroke"}
          />}
          action={() => deleteVehiculo(params.row.idVehiculo)} 
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
          action={() => navigate(`edit/${params.row.placa}`)}
          text="Editar"
          color="primary"
          variant="contained"
        />
      ),
    },
  ];

  return { columns };
};
