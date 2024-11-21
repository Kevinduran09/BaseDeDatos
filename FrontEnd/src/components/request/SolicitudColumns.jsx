import React from "react";
import { CustomButton } from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { useSolicitudActions } from "./useSolicitudActions";
import { EyeIcon } from 'hugeicons-react'
import { Delete02Icon } from 'hugeicons-react';

export const SolicitudColumns = () => {
  const navigate = useNavigate(); 
  const {deleteSolicitud}= useSolicitudActions()
  const columns = [
    { field: "idSolicitud", headerName: "ID", width: 50 },
    {
      field: "cliente",
      headerName: "Cliente",
      width: 150,
      renderCell: (params) => params.row.cliente,
    },
    {
      field: "tipoServicio",
      headerName: "tipoServicio",
      width: 200,
      renderCell: (params) => params.row.tipoServicio,
    },
  
    { field: "fecha", headerName: "Fecha", width: 150 },
    { field: "observacion", headerName: "Observación", width: 150 },
    { field: "estado", headerName: "Estado", width: 150 },
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
          action={() => deleteSolicitud(params.row.idSolicitud)} // Acción de eliminación
          text="Eliminar"
          color="error"
          variant="contained"
        />
      ),
    },
    {
      field: "Ver",
      headerName: "Ver",
      width: 130,
      renderCell: (params) => (
        <CustomButton
          icon={<EyeIcon
            size={24}
            color={"#FFFFFF"}
            variant={"stroke"}
          />}
          action={() => navigate(`ver/${params.row.idSolicitud}`)} // Redirección a la edición
          text="Ver"
          color="primary"
          variant="contained"
        />
      ),
    },
  ];

  return { columns };
};
