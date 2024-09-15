import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
export const FormField = ({
  label,
  name,
  isRequerided = true,
  options,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const optns = isRequerided
    ? {
        required: `${label} es requerido`,
        ...options,
      }
    : {};
  return (
    <FormControl fullWidth margin="normal">
      <TextField
        label={label}
        {...register(name, optns)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...rest}
      />
    </FormControl>
  );
};
