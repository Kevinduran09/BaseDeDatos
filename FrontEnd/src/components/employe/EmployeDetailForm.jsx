import React from "react";
import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../FormField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { NumericFormat } from "react-number-format";
export const EmployeDetailForm = () => {
  const methods = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    methods.reset({ ...{} });
  }, []);

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                name={"email"}
                type={"email"}
              />
              <FormField label={"Teléfono"} name={"telefono"} type={"tel"} />
              <FormField label={"Dirección"} name={"direccion"} />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Información del Puesto</Typography>
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
              <FormField label={"Cargo"} name={"puesto.cargo"} />
              <FormField
                label={"Salario Base"}
                name={"puesto.salarioBase"}
                type={"number"}
              />
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
