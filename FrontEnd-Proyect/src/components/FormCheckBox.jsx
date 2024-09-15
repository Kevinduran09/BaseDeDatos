import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";
export const FormCheckBox = ({ label, name }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const isSeleted = watch(name);
  return (
    <FormControlLabel
      control={<Checkbox checked={!!isSeleted} {...register(name)} />}
      label={label}
    />
  );
};
