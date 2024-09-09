import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { show_alert, show_option, showMsj } from "../../functions";
import AdminAPI from "../../Services/AdminAPI";
import dayjs from "dayjs";

export const ShowSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    fetchSolicitud();
  }, [id]);
  const fetchSolicitud = async () => {
    try {
      const response = await AdminAPI.getSolicitud(id);
      setSolicitud(response);
      populateForm(response);
    } catch (error) {
      console.error("Error fetching solicitud:", error);
      show_alert({ icon: "error", title: "No se pudo cargar la solicitud" });
    }
  };
  const populateForm = (data) => {
    console.log(data);
    setValue("nombre", data.cliente.nombre);
    setValue("apellido", data.cliente.apellido);
    setValue(
      "numeros",
      data.cliente.telefonos
        .map(
          (telefono) => `${telefono.tipoTelefono} : ${telefono.numeroTelefono}`
        )
        .join(", ")
    );
    setValue("correoElectronico", data.cliente.correoElectronico);
    setValue("cedula", data.cliente.cedula);
    setValue("nombreDestino", data.destino.descripcionValor);
    setValue("direccion", data.destino.direccionFisica);
    setValue("pais", data.destino.pais);
    setValue("provincia", data.destino.provincia);
    setValue("ciudad", data.destino.ciudad);
    setValue("hora", data.fecha);
    setValue("observacion", data.observacion);
    setValue("estado", data.estado);
  };

  const handletProcess = () => {
    if (solicitud.estado !== "pendiente") {
      show_alert({
        title:
          "No se puede proceder porque esta solicitud no está en pendiente",
        icon: "warning",
      });
      return;
    }
    navigate(`/admin/request/${id}`);
  };

  const cancelSolicitud = async () => {
    try {
      const flag = await show_option(
        "¿Desea cancelar esta solicitud?",
        null,
        "warning",
        "Sí, cancelar"
      );
      console.log(solicitud);
      if (flag) {
        await AdminAPI.cancelSolicitud(solicitud.idSolicitud);
        showMsj("Solicitud cancelada con éxito", "success");
        navigate("/admin/requests");
      }
      fetchSolicitud();
    } catch (error) {
      console.error("Error canceling solicitud:", error);
      show_alert({ icon: "error", title: "No se pudo cancelar la solicitud" });
    }
  };

  const onSubmit = async (data) => {
    data["fecha"] = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    try {
      let result = null;
      if (data.idSolicitud) {
        result = await AdminAPI.updateSolicitud(data);
        showMsj("Actualizada con éxito la solicitud", "success");
      } else {
        result = await AdminAPI.createSolicitud(data);
        showMsj("Creada con éxito la solicitud", "success");
      }
      fetchSolicitud();
    } catch (error) {
      console.error("Error submitting solicitud:", error);
      show_alert({ icon: "error", title: "No se pudo procesar la solicitud" });
    }
    reset();
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit()}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={6}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Información del Cliente</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      variant="outlined"
                      {...register("nombre")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      variant="outlined"
                      {...register("apellido")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Número(s)"
                      variant="outlined"
                      {...register("numeros")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      variant="outlined"
                      {...register("correoElectronico")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Cédula"
                      variant="outlined"
                      {...register("cedula")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Información del Destino</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      variant="outlined"
                      {...register("nombreDestino")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      variant="outlined"
                      {...register("direccion")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="País"
                      variant="outlined"
                      {...register("pais")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Provincia"
                      variant="outlined"
                      {...register("provincia")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Ciudad"
                      variant="outlined"
                      {...register("ciudad")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Información General</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Hora"
                      variant="outlined"
                      {...register("hora")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Observación"
                      variant="outlined"
                      {...register("observacion")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Estado"
                      variant="outlined"
                      {...register("estado")}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              gap: "10px",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="btn btn-secondary"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handletProcess}
              >
                Procesar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={cancelSolicitud}
              >
                Cancelar Solicitud
              </button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
