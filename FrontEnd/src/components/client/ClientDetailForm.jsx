import React, { useEffect, useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button } from "@mui/material";
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
  const [coordenadas, setCoordenadas] = useState(""); // Estado para almacenar las coordenadas
  const coordenadasRef = useRef(null); // Referencia para el campo de coordenadas

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

  // Nueva función para manejar la selección de coordenadas
  const handleSelectCoordinates = (coords) => {
    const coordinatesString = coords.join(", ");
    setCoordenadas(coordinatesString); // Actualiza las coordenadas
    methods.setValue("direccion.coordenadas", coordinatesString); // Establece las coordenadas en el formulario
    if (coordenadasRef.current) {
      coordenadasRef.current.focus(); // Establece el enfoque en el campo de coordenadas
    }
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
              <Button
                variant="outlined"
                size="small" // Cambiar el tamaño del botón
                onClick={() => setModalOpen(true)}
                sx={{ marginTop: "16px", marginBottom: "8px" }}
              >
                Seleccionar Ubicación
              </Button>
              <FormField
                label={"Coordenadas"}
                name={"direccion.coordenadas"}
                inputRef={coordenadasRef} // Establece la referencia en el campo de coordenadas
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
