import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
  InputLabel,
  Input,
} from "@mui/material";
import dayjs from "dayjs";
import { show_option, showMsj, show_alert } from "../../functions";
import AdminAPI from "../../Services/AdminAPI";
import { Actions } from "../helpers/Actions";
import { TableComponent } from "../client/TableComponent";
import { useNavigate } from "react-router-dom";
export const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const navegate = useNavigate();
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await AdminAPI.getRequests();
      const data = response.data || [];
      console.log(data.data);
      setSolicitudes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () =>
    reset({
      nombre: "",
      apellido: "",
      numeros: "",
      correoElectronico: "",
      cedula: "",
      nombreDestino: "",
      direccion: "",
      pais: "",
      provincia: "",
      ciudad: "",
      estado: "",
      observacion: "",
      hora: null,
    });
  const onSubmit = async (data) => {
    data["fecha"] = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    try {
      let result = null;
      if (data.idSolicitud) {
        result = await AdminAPI.updateSolicitud(data);
        showMsj("Actualizada con éxito la solicitud");
      } else {
        result = await AdminAPI.createSolicitud(data);
        showMsj("Creada con éxito la solicitud");
      }
      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      show_alert({ icon: "error", title: "No se pudo procesar la solicitud" });
    }
    reset();
  };

  const handleDeleteSolicitud = async (idSolicitud) => {
    try {
      const flag = await show_option(
        "Eliminar",
        "¿Desea eliminar la solicitud?",
        "warning"
      );
      console.log(flag);
      if (flag) {
        await AdminAPI.deleteSolicitud(idSolicitud);
        showMsj("Solicitud eliminada con éxito");
        fetchSolicitudes();
      }
    } catch (error) {
      console.error(error);
      show_alert({ icon: "error", title: "No se pudo eliminar la solicitud" });
    }
  };
  const selectedSolicitud = (data) => {
    navegate(`/admin/solicitud/${data.idSolicitud}`);
  };

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
      field: "idDestino",
      headerName: "Destino",
      width: 259,
      renderCell: (params) => params.row.destino.descripcionValor,
    },
    { field: "fecha", headerName: "Fecha", width: 150 },
    { field: "observacion", headerName: "Observación", width: 150 },
    { field: "estado", headerName: "Estado", width: 150 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Actions
            {...{ params }}
            editFuntion={selectedSolicitud}
            deleteFunction={handleDeleteSolicitud}
          />
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-3">
      <TableComponent data={solicitudes} columns={columns} reset={resetForm} />
    </div>
  );
};
