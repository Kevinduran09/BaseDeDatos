import React, { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Divider,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, GitHub, Google, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginSession } from "../../services/AuthAPI";
import { ErrorDialogo, msjDialogo } from "../dialogos/Dialogos";
import { useAuthStore } from "../../store/useAuthStore";
import { useForm, Controller } from "react-hook-form";
import { getMyInfo } from "../../services/ClientService";
const SignIn = () => {
  const { login, setPerfil } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [VisiblePassword, setVisiblePassword] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginSession(data);
      const { token, user } = res.data;
      msjDialogo("Inicio de sesión exitoso", null, "success", login(user, token));
      setIsLoading(false);
      if(user.cargo == 'Administrador' || user.cargo == 'Chofer'){
        navigate('/app')
      }else{
        const res = await getMyInfo(user.issCliente)
        console.log(res);
        setPerfil(res)
        navigate("/");
      }
      
    } catch (error) {
      console.error(error.response.data);
      setIsLoading(false);
      ErrorDialogo("Error", error.response.data);
    }
  };

  

  return (
  
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        sx={{ maxWidth: 400, mx: "auto", borderRadius: 2, backgroundColor: "#fff", boxShadow: 3, maxHeight: { md: '700px' ,xs:'700px'}}}
      >
        <LockOutlined sx={{ fontSize: 48, color: "#000", marginBottom: 2 }} />

        <Typography variant="h5" color="black" gutterBottom>
          Sign In
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Welcome, please sign in to continue
        </Typography>

        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            fullWidth
            sx={{
              color: "#000",
              borderColor: "#000",
              textTransform: "none",
              fontWeight: "bold",
              padding: 1.2,
              marginBottom: 1,
              "&:hover": { backgroundColor: "#f7f7f7", borderColor: "#000" },
            }}
          >
            Sign In with GitHub
          </Button>

          <Button
            variant="outlined"
            startIcon={<Google />}
            fullWidth
            sx={{
              color: "#000",
              borderColor: "#000",
              textTransform: "none",
              fontWeight: "bold",
              padding: 1.2,
              marginBottom: 2,
              "&:hover": { backgroundColor: "#f7f7f7", borderColor: "#000" },
            }}
          >
            Sign In with Google
          </Button>
        </Box>

        <Divider sx={{ width: "100%", marginBottom: 2 }} />

       

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              label="Username"
              fullWidth
              margin="normal"
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
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#bbb" },
                  "&:hover fieldset": { borderColor: "#000" },
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Password"
              type={VisiblePassword ? "text" : "password"}
              fullWidth
              margin="normal"
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
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#bbb" },
                  "&:hover fieldset": { borderColor: "#000" },
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox style={{ color: "#000" }} />}
              label={<Typography color="textSecondary">Remember me</Typography>}
              sx={{ marginBottom: 2 }}
            />

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
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>

        <Typography variant="body2" marginTop={2} color="textSecondary">
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer", color: "#000", textDecoration: "underline" }}
          >
            Register Now
          </Link>
        </Typography>
      </Box>
  );
};

export default SignIn;
