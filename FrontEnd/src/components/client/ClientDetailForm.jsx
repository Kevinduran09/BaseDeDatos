import React, { useEffect, useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import useClientData from "./useClientData";
import { Loading } from "../../utils/loading";
import { useClientActions } from "./handler/useClientActions";
import LocationSelector from "../map/LocationSelector"; // Importa el nuevo componente

export const ClientDetailForm = () => {
  const { createCliente, updateCliente } = useClientActions();
  const { id } = useParams();
  const { cliente, isLoading, isError } = useClientData(id);
  const methods = useForm({
    defaultValues: cliente,
  });

  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const [coordenadas, setCoordenadas] = useState({ lat: "", lng: "" }); // Almacena latitud y longitud

  useEffect(() => {
    if (cliente) {
      methods.reset(cliente);
    }
  }, [cliente]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar el cliente.</div>;

  const onSubmit = methods.handleSubmit(async (data) => {
    if (id !== ":id" && id !== null) {
      updateCliente(data);
    } else {
      createCliente(data);
    }
  });

  // Maneja la selección de coordenadas desde el mapa
  const handleSelectCoordinates = (coords) => {
    const [lat, lng] = coords;
    setCoordenadas({ lat, lng }); // Actualiza lat y lng en el estado
    methods.setValue("direccion.lat", lat); // Establece latitud en el formulario
    methods.setValue("direccion.lng", lng); // Establece longitud en el formulario
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="content p-sm-2 p-lg-5">
          <Box>
            <Typography variant="h6">Informacion General</Typography>
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
              <FormField label={"Cedula"} name={"cedula"} />
              <FormField
                label={"Correo Electronico"}
                name={"correoElectronico"}
                type={"email"}
              />
              <FormField label={"Nombre Usuario"} name={"nombreUsuario"} />
              <FormField label={"Contraseña"} name={"contrasena"} />
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h6">Direccion</Typography>
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
              <TextField
                label="Coordenadas"
                value={
                  coordenadas.lat && coordenadas.lng
                    ? `${coordenadas.lat}, ${coordenadas.lng}`
                    : "Seleccionar dirección"
                }
                InputProps={{
                  readOnly: true,
                }}
                onClick={() => setModalOpen(true)} // Al hacer clic, abre el mapa
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: "16px",
                  marginBottom: "8px",
                  cursor: "pointer",
                }}
              />
              <FormField
                label={"Nombre direccion"}
                name={"direccion.nombreDireccion"}
              />
              <FormField
                label={"País"}
                name={"direccion.pais"}
                isRequerided={true}
              />
              <FormField label={"Estado"} name={"direccion.estado"} />
              <FormField label={"Ciudad"} name={"direccion.ciudad"} />
              <FormField label={"Distrito"} name={"direccion.distrito"} />
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

      <LocationSelector
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectCoordinates} // Llama a la nueva función aquí
      />
    </FormProvider>
  );
};
