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

import {
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



import { useNavigate } from "react-router-dom";
import { loginSession } from "../../services/AuthAPI";
import { ErrorDialogo, msjDialogo } from "../dialogos/Dialogos";
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
  const [VisiblePassword, setVisiblePassword] = useState(false)
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
      navegate('/')
    } catch (error) {
      console.error(error.response.data);
      setisLoading(false);
      ErrorDialogo("Error", error.response.data);
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

    
      <Typography variant="h5" color="black" gutterBottom>
        Sign in
      </Typography>

      <Typography variant="body1" color="gray" gutterBottom>
        Welcome user, please sign in to continue
      </Typography>

  
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

      
        <TextField
          variant="outlined"
          label="Password"
          type={VisiblePassword ? "text" : "password"}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton style={{ color:'#c2aff0'}} onClick={()=>setVisiblePassword(!VisiblePassword)} edge="end">
                  {VisiblePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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

     
        <FormControlLabel
          control={<Checkbox style={{ color: "#2196f3" }} />}
          label={<Typography color="gray">Remember me</Typography>}
          sx={{ alignSelf: "flex-start", marginBottom: 2 }}
        />

  
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
