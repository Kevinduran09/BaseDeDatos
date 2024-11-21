import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button, Switch, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../../utils/loading";
import { useClientActions } from "./handler/useClientActions";

export const ClientDetailForm = () => {
  const { createCliente, updateCliente, fetchCliente } = useClientActions();
  const { id } = useParams();
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  const [isTelefonoFijoEnabled, setIsTelefonoFijoEnabled] = useState(true);
  const [isTelefonoMovilEnabled, setIsTelefonoMovilEnabled] = useState(true);
  const [isTelefonoTrabajoEnabled, setIsTelefonoTrabajoEnabled] = useState(true);

  useEffect(() => {
    const loadCliente = async () => {
      if (id) {
        try {
          const fetchedCliente = await fetchCliente(id);
          if (fetchedCliente) {
            methods.reset(fetchedCliente);
          }
        } catch (error) {
          setIsError(true);
          console.error("Error al cargar el cliente:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadCliente();
  }, [id, methods]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar el cliente.</div>;

  const onSubmit = methods.handleSubmit(async (data) => {
    
    if (!isTelefonoFijoEnabled) delete data.telefonoFijo;
    if (!isTelefonoMovilEnabled) delete data.telefonoMovil;
    if (!isTelefonoTrabajoEnabled) delete data.telefonoTrabajo;

    if (id) {
      updateCliente({ ...data, id });
    } else {
      createCliente(data);
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
              <FormField
                label={"Correo Electrónico"}
                name={"correoElectronico"}
                type={"email"}
              />
              <FormField label={"Nombre Usuario"} name={"nombreUsuario"} />
              <FormField label={"Contraseña"} name={"contrasena"} />
            </Box>
          </Box>

          {/* Sección de Teléfonos */}
          <Box mt={3}>
            <Typography variant="h6">Teléfonos</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: {
                  xs: '100%',  // En pantallas móviles, ocupa el 100% del contenedor
                  md: '50%'    // En pantallas grandes, ocupa el 70%
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start", gap: 2}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isTelefonoFijoEnabled}
                      onChange={(e) => setIsTelefonoFijoEnabled(e.target.checked)}
                
                    />
                  }
                  label="Habilitar Teléfono Fijo"
                />
                {isTelefonoFijoEnabled && (
                  <FormField label={"Teléfono Fijo"} name={"telefonoFijo"} />
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isTelefonoMovilEnabled}
                      onChange={(e) => setIsTelefonoMovilEnabled(e.target.checked)}
                    
                    />
                  }
                  label="Habilitar Teléfono Móvil"
                />
                {isTelefonoMovilEnabled && (
                  <FormField label={"Teléfono Móvil"} name={"telefonoMovil"} />
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isTelefonoTrabajoEnabled}
                      onChange={(e) => setIsTelefonoTrabajoEnabled(e.target.checked)}
                     
                    />
                  }
                  label="Habilitar Teléfono Trabajo"
                />
                {isTelefonoTrabajoEnabled && (
                  <FormField label={"Teléfono Trabajo"} name={"telefonoTrabajo"} />
                )}
              </Box>
            </Box>
          </Box>
        </div>

        <Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
