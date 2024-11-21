import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField, Switch, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../../utils/loading";
import { useEmployeeActions } from "./handler/useEmployeActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const EmployeeDetailForm = () => {
  const { createEmpleado, updateEmpleado, fetchEmpleado, fetchPuestos } = useEmployeeActions();
  const { id } = useParams();
  const methods = useForm();
  const [empleado, setEmpleado] = useState(null);
  const [puestos, setPuestos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(true); 

  useEffect(() => {
    const loadEmpleado = async () => {
      if (id) {
        try {
          const fetchedEmpleado = await fetchEmpleado(id);
          if (fetchedEmpleado) {
            methods.reset(fetchedEmpleado[0]);
            setEmpleado(fetchedEmpleado[0]);
          }
        } catch (error) {
          setIsError(true);
          console.error("Error al cargar el empleado:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    const loadPuestos = async () => {
      try {
        const puestosData = await fetchPuestos();
        setPuestos(puestosData);
      } catch (error) {
        console.error("Error al cargar los puestos:", error);
      }
    };

    loadEmpleado();
    loadPuestos();
  }, [id, methods]);


  useEffect(() => {
    if (id) {
      setIsPhoneEditable(true);
    }
  }, [id]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar el empleado.</div>;

  const onSubmit = methods.handleSubmit(async (data) => {
    if (id) {
      console.log(isPhoneEditable);

      if (!isPhoneEditable) {
        delete data.telefonoMovil
      }
      updateEmpleado({ ...data, id });
    } else {
     
      createEmpleado(data);
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
              <FormField label={"Nombre"} name={"nombre"} />
              <FormField label={"Apellido"} name={"apellido"} />
              <FormField label={"Cédula"} name={"cedula"} />
              <FormField label={"Correo Electrónico"} name={"correoElectronico"} type={"email"} />
              <FormField label={"Nombre Usuario"} name={"nombreUsuario"} />
              <FormField label={"Contraseña"} name={"contrasena"} />
            </Box>
          </Box>

          {/* Sección de Cargo */}
          <Box mt={3}>
            <Typography variant="h6">Cargo</Typography>
            <FormControl fullWidth>
              <InputLabel id="cargo-label">Cargo</InputLabel>
              <Controller
                name="idPuesto"
                control={methods.control}
                rules={{ required: "El cargo es obligatorio" }}
                defaultValue={empleado ? empleado.idPuesto : ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="cargo-label"
                    label="Cargo"
                  >
                    {puestos.map((puesto) => (
                      <MenuItem key={puesto.idPuesto} value={puesto.idPuesto}>
                        {puesto.cargo}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          {/* Sección de Fechas */}
          <Box mt={3}>
            <Typography variant="h6">Fechas</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                gap: 2,
                rowGap: 1,
              }}
            >
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Fecha de Nacimiento"
                    value={dayjs(empleado?.fechaNacimiento) || null}
                    onChange={(value) => methods.setValue("fechaNacimiento", value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Fecha de Contratación"
                    value={dayjs(empleado?.fechaContratacion) || null}
                    onChange={(value) => methods.setValue("fechaContratacion", value)}
                    disablePast
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Box>

          {/* Sección de Dirección */}
          <Box mt={3}>
            <Typography variant="h6">Dirección</Typography>
            <FormField label={"Dirección"} name={"direccion"} />
          </Box>

          {/* Sección de Teléfonos */}
          <Box mt={3}>
            <Typography variant="h6">Teléfonos</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                gap: 2,
                rowGap: 1,
              }}
            >
              {id && ( // Mostrar el toggle solo si hay un ID
                <FormControlLabel
                  control={
                    <Switch
                      checked={isPhoneEditable}
                      onChange={() => setIsPhoneEditable(!isPhoneEditable)}
                    />
                  }
                  label="Habilitar edición del teléfono"
                />
              )}
              <FormField
                label={"Teléfono Movil"}
                name={"telefonoMovil"}
                disabled={!isPhoneEditable} // Deshabilitar el campo si el toggle está apagado
              />
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
