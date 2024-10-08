import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@mui/material";

const tiposDeTelefono = [
  { tipoTelefono: "personal", numeroTelefono: "" },
  { tipoTelefono: "organizacion", numeroTelefono: "" },
  { tipoTelefono: "fijo", numeroTelefono: "" },
  { tipoTelefono: "secundario", numeroTelefono: "" },
];

const PhoneFields = ({ control, telefonos }) => {
  const telefonosPredefinidos =
    telefonos && telefonos.length > 0
      ? tiposDeTelefono.map((tipo) => {
          const telefonoEncontrado = telefonos.find(
            (t) => t.tipoTelefono === tipo.tipoTelefono
          );
          return telefonoEncontrado || { ...tipo };
        })
      : tiposDeTelefono;

  return (
    <div>
      {telefonosPredefinidos.map((telefono, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr",
            marginBottom: "25px",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            {telefono.tipoTelefono.charAt(0).toUpperCase() +
              telefono.tipoTelefono.slice(1).toLowerCase()}
          </Typography>

          <Controller
            name={`telefonos[${index}].numeroTelefono`}
            control={control}
            defaultValue={telefono.numeroTelefono}
            render={({ field }) => (
              <TextField {...field} label="Número de Teléfono" fullWidth />
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default PhoneFields;
