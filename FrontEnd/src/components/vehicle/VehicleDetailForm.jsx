import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button, FormControl, MenuItem, Select, InputLabel, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../../utils/loading";
import { useVehicleActions } from "./handler/useVehicleActions";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const VehicleDetailForm = () => {
  const { createVehiculo, updateVehiculo, fetchVehiculo } = useVehicleActions();
  const { id } = useParams();
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [transmisiones, setTransmisiones] = useState(["Manual", "Automática", "Semi-automática"]);
  const [combustibles, setCombustibles] = useState(["Gasolina", "Diésel", "Eléctrico", "Híbrido"]);
  const [puertas, setPuertas] = useState([2, 3, 4, 5]);

  useEffect(() => {
    const loadVehicle = async () => {
      if (id) {
        try {
          const fetchedVehicle = await fetchVehiculo(id);
          if (fetchedVehicle) {
            methods.reset(fetchedVehicle[0]);
          }
        } catch (error) {
          setIsError(true);
          console.error("Error al cargar el vehículo:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadVehicle();
  }, [id, methods]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar el vehículo.</div>;

  const onSubmit = methods.handleSubmit(async (data) => {
    if (id) {
      updateVehiculo({ ...data, id });
    } else {
      createVehiculo(data);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="content p-sm-2 p-lg-5">
          <Box>
            <Typography variant="h6">Información General</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                gap: 3,
                rowGap: 1,
              }}
            >
              <FormField label={"Tipo de Vehículo"} name={"tipoVehiculo"} />
              <FormField label={"Placa"} name={"placa"} />
              <FormField label={"Capacidad"} name={"capacidad"} type={"number"} rules={{ required: "Capacidad es obligatoria", min: 1 }} />
              <FormField label={"Modelo"} name={"modelo"} />
              <Controller
                name="fechaCompra"
                control={methods.control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" required>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker
                        label="Fecha de Compra"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date ? dayjs(date) : null)}
                        
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                )}
              />
              <FormField label={"Año del Vehículo"} name={"anoVehiculo"} type={"number"} rules={{ required: "Año es obligatorio", min: 1900, max: new Date().getFullYear() }} />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Ficha Técnica</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                gap: 3,
                rowGap: 1,
              }}
            >
              <FormField label={"Potencia (HP)"} name={"potencia"} type={"number"} rules={{ required: "Potencia es obligatoria", min: 0 }} />
              <Controller
                name="transmision"
                control={methods.control}
                
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Transmisión</InputLabel>
                    <Select {...field} label="Transmisión" required>
                      {transmisiones.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="combustible"
                control={methods.control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Combustible</InputLabel>
                    <Select {...field} label="Combustible" required>
                      {combustibles.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <FormField label={"Color"} name={"color"} />
              <Controller
                name="numeroPuertas"
                control={methods.control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Número de Puertas</InputLabel>
                    <Select {...field} label="Número de Puertas" required>
                      {puertas.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <FormField label={"Kilometraje"} name={"kilometraje"} type={"number"} rules={{ min: 0 }} />
              <Controller
                name="fechaUltimoMantenimiento"
                control={methods.control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" required>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker
                        label="Fecha Último Mantenimiento"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date ? dayjs(date) : null)}
                        
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                )}
              />
              <FormField label={"Carnet de Circulación"} name={"carnetCirculacion"} />
            </Box>
          </Box>

        </div>

        <Box>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
            Guardar
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
