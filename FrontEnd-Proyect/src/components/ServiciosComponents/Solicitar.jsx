import React, { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../styles/SolicitarServicio.css";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  getDestinos,
  getServicios,
  postsolicitud,
} from "../../Services/ClientAPI";
import dayjs from "dayjs";
import { showMsj } from "../../utils/functions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Solicitar = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [destinos, setDestinos] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetchDestinos();
    fetchServicios();
  }, []);

  const fetchDestinos = async () => {
    try {
      const res = await getDestinos();
      if (res) {
        setDestinos(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServicios = async () => {
    try {
      const res = await getServicios();
      if (res) {
        setServicios(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const formattedDate = dayjs(data.fecha).format("YYYY-MM-DD HH:MM");
    const formattedData = { ...data, fecha: formattedDate };
    const cliente = JSON.parse(sessionStorage.getItem("current"));
    formattedData["cliente"] = cliente.issCliente;
    console.log(formattedData);

    try {
      const res = await postsolicitud(formattedData);

      console.log(res);
      showMsj("Se realizo su solicitud con exito!");
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <Fragment>
      <div className="w-100 d-flex justify-content-center">
        <div className="bg-white p-3 rounded" style={{ width: "60%" }}>
          <div className="row mb-5">
            <h2>Formulario solicitud de servicio</h2>
          </div>
          <form className="form-solicitar" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={3}
              justifyContent={"center"}
              sx={{ maxWidth: "100%" }}
            >
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }} error={!!errors.servicio}>
                  <InputLabel id="demo-multiple-name-label">
                    Servicios
                  </InputLabel>
                  <Controller
                    name="servicio"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Servicio es obligatorio" }}
                    render={({ field }) => (
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        {...field}
                        input={<OutlinedInput label="Servicio" />}
                        MenuProps={MenuProps}
                      >
                        {servicios.map((servicio) => (
                          <MenuItem
                            key={servicio.idServicio}
                            value={servicio.idServicio}
                          >
                            {servicio.tipoServicio}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.servicio && (
                    <span className="requiredAlert">
                      {errors.servicio.message}
                    </span>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }} error={!!errors.destino}>
                  <InputLabel id="demo-multiple-places-label">
                    Destino
                  </InputLabel>
                  <Controller
                    name="destino"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Destino es obligatorio" }}
                    render={({ field }) => (
                      <Select
                        labelId="demo-multiple-places-label"
                        id="demo-multiple-places"
                        {...field}
                        input={<OutlinedInput label="Destino" />}
                        MenuProps={MenuProps}
                      >
                        {destinos.map((destino) => (
                          <MenuItem
                            key={destino.idDestino}
                            value={destino.idDestino}
                          >
                            {destino.descripcionValor}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.destino && (
                    <span className="requiredAlert">
                      {errors.destino.message}
                    </span>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="fecha"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Fecha es obligatoria" }}
                    render={({ field }) => (
                      <DateTimePicker
                        inputFormat="DD/MM/YYYY :HH:mm"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        sx={{ width: "100%" }}
                        label="Fecha"
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                      />
                    )}
                  />
                  {errors.fecha && (
                    <span className="requiredAlert">
                      {errors.fecha.message}
                    </span>
                  )}
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.observacion}>
                  <TextField
                    label="Observacion"
                    multiline
                    variant="outlined"
                    {...register("observacion", {
                      required: "Observacion es obligatoria",
                    })}
                  />
                  {errors.observacion && (
                    <span className="requiredAlert">
                      {errors.observacion.message}
                    </span>
                  )}
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Button type="submit" variant="contained">
                  Enviar Solicitud
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
