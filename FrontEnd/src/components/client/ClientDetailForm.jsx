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
import { useParams } from "react-router-dom";
import useClientData from "./useClientData";
import { Loading } from "../../utils/loading";
import PhoneFields from "../PhoneFields";
import { useClientActions } from "./handler/useClientActions";
export const ClientDetailForm = () => {
  const { createCliente, updateCliente } = useClientActions();
  const { id } = useParams();
  const { cliente, isLoading, isError } = useClientData(id);
  const methods = useForm({
    defaultValues: cliente,
  });

  useEffect(() => {
    if (cliente) {
      methods.reset(cliente);
    } else {
      methods.reset();
    }
  }, [cliente]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar el cliente.</div>;

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(id);
    console.log(data);

    if (id !== ":id" && id !== null) {
      updateCliente(data);
    } else {
      createCliente(data);
    }
  });

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
              <FormField label={"Coordenadas"} name={"direccion.coordenadas"} />
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
          {/* <Box mt={3}>
            <Typography variant="h6">Teléfonos de Contacto</Typography>
            <Box mt={3} gap={2}>
              <PhoneFields
                control={methods.control}
                telefonos={cliente.telefonos || []}
              />
            </Box>
          </Box> */}
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

/*

 <FormField
                isRequerided={false}
                disabled={!sitioWeb}
                label={"Website URL"}
                name={"website_url"}
              />
              <FormField label={"Coordenadas"} name={"coordenadas"} />
              <FormField label={"Cantón"} name={"canton"} />
              <FormField label={"Distrito"} name={"distrito"} />

              <FormField label={"Comunidad"} name={"comunidad"} />
              <FormField label={"Dirección exacta"} name={"direccion_exacta"} />
              <FormField label={"Descripción"} name={"descripcion"} />
              <FormField
                label={"Tiempo de operación (años)"}
                name={"tiempo_operacion_anios"}
              />


 <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="figura_legal"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Figura Legal</InputLabel>
                      <Select {...field} label="Figura Legal">
                        {figurasLegales.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="sector_empresarial"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Sector Empresarial</InputLabel>
                      <Select {...field} label="Sector Empresarial">
                        {sectoEmpresarial.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>



<Box mt={3}>
            <Typography variant="h6">Redes Sociales</Typography>
            <Box mt={1}>
              <FormCheckBox name={"pagina_web"} label={"¿Tiene página web?"} />
              <FormCheckBox name={"facebook"} label={"Facebook activo"} />
              <FormCheckBox name="instagram_activo" label="Instagram activo" />
              <FormCheckBox name="youtube_activo" label="YouTube activo" />
              <FormCheckBox name="tiktok_activo" label="TikTok activo" />
              <FormCheckBox name="linkedin_activo" label="LinkedIn activo" />
              <FormCheckBox name="pinterest_activo" label="Pinterest activo" />
              <FormCheckBox name="whatsapp_activo" label="WhatsApp activo" />
              <FormCheckBox
                name="otra_red_social_activo"
                label="Otra red social activa"
              />
              {!!otherSocialEnable && (
                <FormField
                  sx={{ width: "30%" }}
                  label={"Nombre de otra red social"}
                  name={"otra_red_social_nombre"}
                />
              )}
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h6">Sector Empresarial</Typography>
            <Box mt={1} gap={"5px"}>
              <FormCheckBox name={"pesca"} label={"Pesca"} />
              <FormCheckBox name={"agricultura"} label="Agricultura" />
              <FormCheckBox name={"agroindustria"} label={"Agroindustria"} />
              <FormCheckBox name={"pecuario"} label={"Pecuario"} />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Inscripciones</Typography>
            <Box mt={1}>
              <FormCheckBox name="ccss_inscrita" label="CCSS inscrita" />
              <FormCheckBox name="ins_inscrita" label="INS inscrita" />
              <FormCheckBox
                name="hacienda_inscrita"
                label="Hacienda inscrita"
              />
              <FormCheckBox name="meic_inscrita" label="MEIC inscrita" />
            </Box>
          </Box>
          */
