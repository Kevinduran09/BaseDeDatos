import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  Link,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerClient } from "../services/AuthAPI"; // Cambia esto por tu servicio de registro
import { ErrorDialogo, msjDialogo } from "../components/dialogos/Dialogos";

// Expresión regular para la cédula de Costa Rica (9 dígitos, empieza con un número válido)
const cedulaValidation = /^[1-4][0-9]{8}$/;

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [VisiblePassword, setVisiblePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerClient(data);
      msjDialogo("Registro exitoso", "Tu cuenta ha sido creada correctamente", "success");
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || "Error en el registro");
      setIsLoading(false);
      ErrorDialogo("Error", error.response?.data || "Hubo un problema al registrar la cuenta");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        sx={{ maxWidth: 600, mx: "auto", borderRadius: 2, backgroundColor: "#fff", boxShadow: 3, margin: { xs: 2 } }}
      >
        <LockOutlined sx={{ fontSize: 48, color: "#000", marginBottom: 2 }} />

        <Typography variant="h5" color="black" gutterBottom>
          Register
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Create an account to get started
        </Typography>

        <Divider sx={{ width: "100%", marginBottom: 2 }} />

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="First Name"
                fullWidth
                {...register("nombre", { required: "First name is required" })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Last Name"
                fullWidth
                {...register("apellido", { required: "Last name is required" })}
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Username"
                fullWidth
                {...register("nombreUsuario", { required: "Username is required" })}
                error={!!errors.nombreUsuario}
                helperText={errors.nombreUsuario?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                fullWidth
                {...register("correoElectronico", { required: "Email is required" })}
                error={!!errors.correo}
                helperText={errors.correo?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Password"
                type={VisiblePassword ? "text" : "password"}
                fullWidth
                {...register("contrasena", { required: "Password is required" })}
                error={!!errors.contrasena}
                helperText={errors.contrasena?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setVisiblePassword(!VisiblePassword)}>
                        {VisiblePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Cedula (Costa Rica)"
                fullWidth
                {...register("cedula", {
                  required: "Cedula is required",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "Invalid Cedula format (must be 9 digits and start with 1-4)",
                  },
                })}
                error={!!errors.cedula}
                helperText={errors.cedula?.message}
                InputLabelProps={{ style: { color: "#555" } }}
                InputProps={{
                  style: {
                    color: "#000",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#bbb" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              padding: 1.5,
              textTransform: "none",
              marginTop: 2,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography variant="body2" marginTop={2} color="textSecondary">
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer", color: "#000", textDecoration: "underline" }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
