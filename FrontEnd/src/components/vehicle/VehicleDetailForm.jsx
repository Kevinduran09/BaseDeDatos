import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export const VehicleDetailForm = () => {
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="content p-sm-2 p-lg-5">
          {/* Información del Vehículo */}
          <Box mt={3}>
            <Typography variant="h6">Información del Vehículo</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                rowGap: 1,
                alignItems: "baseline",
                gap: 2,
              }}
            >
              <FormField label={"Tipo de Vehículo"} name={"tipoVehiculo"} />
              <FormField label={"Placa"} name={"placa"} />
              <FormField
                label={"Capacidad"}
                name={"capacidad"}
                type={"number"}
              />
              <FormField label={"Modelo"} name={"modelo"} />
              <Controller
                name={"fechaCompra"}
                control={methods.control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Fecha de Compra"
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                    />
                  </LocalizationProvider>
                )}
              />
              <FormField
                label={"Año del Vehículo"}
                name={"anoVehiculo"}
                type={"number"}
              />
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
                rowGap: 1,
                gap: 3,
              }}
            >
              <FormField label={"Motor"} name={"fichaTecnica.motor"} />
              <FormField
                label={"Cilindrada"}
                name={"fichaTecnica.cilindrada"}
              />
              <FormField label={"Potencia"} name={"fichaTecnica.potencia"} />
              <FormField
                label={"Tipo de Combustible"}
                name={"fichaTecnica.tipoCombustible"}
              />
              <FormField
                label={"Transmisión"}
                name={"fichaTecnica.transmision"}
              />
              <FormField
                label={"Dimensiones"}
                name={"fichaTecnica.dimensiones"}
              />
              <FormField label={"Peso"} name={"fichaTecnica.peso"} />
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
