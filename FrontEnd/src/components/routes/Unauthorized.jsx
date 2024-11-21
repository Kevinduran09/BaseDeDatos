import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                bgcolor: "background.default",
                p: 3,
            }}
        >
            <Typography variant="h4" color="error" gutterBottom>
                Acceso Denegado
            </Typography>
            <Typography variant="body1" gutterBottom>
                No tienes permisos para acceder a esta página.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{ mt: 2 }}
            >
                Volver al Inicio
            </Button>
        </Box>
    );
};
