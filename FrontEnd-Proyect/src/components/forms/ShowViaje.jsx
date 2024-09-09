import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import adminAPI from "../../Services/AdminAPI";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ShowViaje = () => {
  const navegate = useNavigate();
  const [dataViaje, setdataViaje] = useState({});
  const { id } = useParams();
  const { register, setValue } = useForm();

  useEffect(() => {
    console.log(id);

    const fetchdata = async () => {
      try {
        const res = await adminAPI.getViaje(id);
        console.log(res.viaje);
        setdataViaje(res.viaje);
        setValues(res.viaje);
      } catch (error) {}
    };
    fetchdata();
  }, []);

  const setValues = (data) => {
    console.log(data.vehiculo);
    setValue("estado", data.estado);
    setValue("fecha", data.fechaViaje);
    setValue("tipoVehiculo", data.vehiculo.tipoVehiculo);
    setValue("modelo", data.vehiculo.modelo);
    setValue("placa", data.vehiculo.placa);
  };

  return (
    <div className="container p-5">
      <form>
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          sx={{ width: "100%" }}
        >
          <Grid item xs={4}>
            <Item>
              <Typography>Informacion del viaje</Typography>
              <Grid
                container
                direction="row"
                wrap="nowrap"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <OutlinedInput
                    fullWidth
                    variant="outlined"
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    {...register("fecha")}
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="outlined-weight-helper-text">
                    Fecha del viaje
                  </FormHelperText>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Typography>Informacion del vehiculo</Typography>
              <Grid
                container
                direction="row"
                wrap="nowrap"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <OutlinedInput
                    variant="outlined"
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-state-helper-text"
                    {...register("tipoVehiculo")}
                    inputProps={{
                      "aria-label": "estado",
                    }}
                  />
                  <FormHelperText id="outlined-state-helper-text">
                    Tipo Vehiculo
                  </FormHelperText>
                </Grid>
                <Grid item>
                  <OutlinedInput
                    variant="outlined"
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-state-helper-text"
                    {...register("modelo")}
                    inputProps={{
                      "aria-label": "estado",
                    }}
                  />
                  <FormHelperText id="outlined-state-helper-text">
                    Modelo
                  </FormHelperText>
                </Grid>
                <Grid item>
                  <OutlinedInput
                    variant="outlined"
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-placa-helper-text"
                    {...register("placa")}
                    inputProps={{
                      "aria-label": "estado",
                    }}
                  />
                  <FormHelperText id="outlined-placa-helper-text">
                    Placa
                  </FormHelperText>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Empleados</Typography>
              <Grid container>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {dataViaje.empleados?.map((empleado) => (
                    <ListItem
                      sx={{ maxWidth: "100%" }}
                      secondaryAction={
                        <IconButton
                          color="error"
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        id=""
                        primary={`Empleado: ${empleado.nombre} ${empleado.apellido}`}
                        secondary={`Cargo: ${empleado.puesto.cargo}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Recorridos del viaje</Typography>
              <Grid container>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {dataViaje.recorridos?.map((recorrido) => (
                    <ListItem
                      disabled={recorrido.estado == "completado"}
                      secondaryAction={
                        <IconButton
                          color="default"
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            navegate(
                              `/admin/recorrido/${recorrido.idRecorrido}`
                            )
                          }
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={`Direccion: ${recorrido.solicitud.destino.direccionFisica}`}
                        secondary={`Cliente: ${recorrido.cliente.nombre} ${recorrido.cliente.apellido}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Item>
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
            <Button type="submit" variant="contained" color="success">
              Confirmar viaje
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navegate("/admin/viajes")}
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
