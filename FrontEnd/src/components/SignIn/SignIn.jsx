import React from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginSession, currentUser } from "../../services/AuthAPI";
import { msjDialogo } from "../dialogos/Dialogos";
import { GitHub, Google, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
const SignIn = () => {
  const { login } = useAuthStore();
  const navegate = useNavigate();
  const [loginData, setloginData] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const hanleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    setisLoading(true);
    try {
      const res = await loginSession(loginData);
      const { token, user } = res.data;
      msjDialogo(
        "Inicio de sesion exitoso",
        null,
        "success",
        login(user, token)
      );

      setisLoading(false);
    } catch (error) {
      console.error(error);
      setisLoading(false);
    }
  };
  const hanleOnChange = (e) => {
    const { name, value } = e.target;
    setloginData((loginData) => ({ ...loginData, [name]: value }));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      justifyContent="center"
      p={3}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      {/* Icono de candado */}
      <LockOutlined
        sx={{
          fontSize: 50,
          color: "#fff",
          marginBottom: 2,
          backgroundColor: "#2196f3",
          borderRadius: "50%",
          padding: 1,
        }}
      />

      {/* Título */}
      <Typography variant="h5" color="black" gutterBottom>
        Sign in
      </Typography>

      {/* Subtítulo */}
      <Typography variant="body1" color="gray" gutterBottom>
        Welcome user, please sign in to continue
      </Typography>

      {/* Botón de Sign In con GitHub */}
      <Button
        variant="contained"
        startIcon={<GitHub />}
        fullWidth
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          marginBottom: 1.5,
          textTransform: "none",
          fontWeight: "bold",
          padding: 1.5,
          borderRadius: 3,
          "&:hover": { backgroundColor: "#555" },
        }}
      >
        Sign In With GitHub
      </Button>

      {/* Botón de Sign In con Google */}
      <Button
        variant="contained"
        startIcon={<Google />}
        fullWidth
        sx={{
          backgroundColor: "#EA4335",
          color: "#fff",
          marginBottom: 1.5,
          textTransform: "none",
          fontWeight: "bold",
          padding: 1.5,
          borderRadius: 3,
          "&:hover": { backgroundColor: "#d32f2f" },
        }}
      >
        Sign In With Google
      </Button>

      {/* Divider con texto */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Divider sx={{ flexGrow: 1, bgcolor: "gray" }} />
        <Typography variant="body2" color="gray" sx={{ mx: 2 }}>
          or
        </Typography>
        <Divider sx={{ flexGrow: 1, bgcolor: "gray" }} />
      </Box>
      <form onSubmit={hanleSubmit}>
        <TextField
          variant="outlined"
          label="Nombre usuario"
          onChange={hanleOnChange}
          name="nombreUsuario"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: "#c2aff0" } }}
          InputProps={{
            style: {
              color: "#fff",
              backgroundColor: "#393d3f",
              borderColor: "#333",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333",
              },
              "&:hover fieldset": {
                borderColor: "#555",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196f3",
              },
            },
            marginBottom: 2,
          }}
        />

        {/* Campo de contraseña */}
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          name="contrasena"
          fullWidth
          margin="normal"
          onChange={hanleOnChange}
          InputLabelProps={{ style: { color: "#c2aff0" } }}
          InputProps={{
            style: {
              color: "#fff",
              backgroundColor: "#393d3f",
              borderColor: "#333",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333",
              },
              "&:hover fieldset": {
                borderColor: "#555",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196f3",
              },
            },
            marginBottom: 2,
          }}
        />

        {/* Checkbox para recordar */}
        <FormControlLabel
          control={<Checkbox style={{ color: "#2196f3" }} />}
          label={<Typography color="gray">Remember me</Typography>}
          sx={{ alignSelf: "flex-start", marginBottom: 2 }}
        />

        {/* Botón de Sign In */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            backgroundColor: "#2196f3",
            color: "#fff",
            fontWeight: "bold",
            padding: 1.5,
            textTransform: "none",
            "&:hover": { backgroundColor: "#1976d2" },
          }}
        >
          {isLoading ? "Iniciando..." : "Ingresar"}
        </Button>
      </form>
      {/* Campo de correo */}

      {/* Enlace de registro */}
      <Typography variant="body1" marginTop={2} color="gray" gutterBottom>
        Aun no tiene una cuenta?{" "}
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navegate("/dsdds");
          }}
        >
          Registrarse Ahora
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
