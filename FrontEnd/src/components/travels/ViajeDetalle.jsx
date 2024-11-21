import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getViajeDetalle, actualizarEstadoViaje } from "../../services/ViajeService";
import { Card, CardContent, Typography, Grid, Button, Paper } from "@mui/material";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "../map/RoutingControl";
import { Loading } from "../../utils/loading";
import Swal from 'sweetalert2';

const ViajeDetalle = () => {
    const { id } = useParams();
    const [viaje, setViaje] = useState(null);
    const [estado, setEstado] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate(); // Para redirigir

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getWaypoints = (ruta) => {
        return ruta
            .map(punto => [
                [parseFloat(punto.lat_origen), parseFloat(punto.lon_origen)],
                [parseFloat(punto.lat_destino), parseFloat(punto.lon_destino)]
            ])
            .flat();
    };


    const getColorByEstado = (estadoSolicitud) => {
        switch (estadoSolicitud) {
            case "En progreso":
                return "blue";
            case "Origen Recorrido":
                return "blue";
            case "Destino Entregado":
                return "yellow";
            case "Completado":
                return "green";
            case "Cancelado":
                return "red";
            default:
                return "purple";
        }
    };

    useEffect(() => {
        const fetchViaje = async () => {
            try {
                const response = await getViajeDetalle(id);
                setViaje(response);
                setEstado(response.infoViaje[0]?.estado);
            } catch (error) {
                console.error("Error al obtener los detalles del viaje:", error);
            }
        };

        fetchViaje();
    }, [id, estado]);

    const handleEstadoChange = async (nuevoEstado) => {
        try {
            const updatedViaje = await actualizarEstadoViaje(viaje.infoViaje[0]?.idViaje, nuevoEstado);
            console.log(updatedViaje);
            
            if (updatedViaje && updatedViaje.status ==200) {
                setEstado(nuevoEstado);
                Swal.fire({
                    icon: 'success',
                    title: 'Estado actualizado',
                    text: `El viaje ha sido marcado como '${nuevoEstado}'.`,
                    confirmButtonText: 'OK'
                });
            } else {
                throw new Error(updatedViaje.message || 'Error inesperado al actualizar el estado del viaje.');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.error || 'Ha ocurrido un error al actualizar el estado.',
                confirmButtonText: 'Entendido',
            });
        }
    };

    if (!viaje) {
        return <Loading />;
    }

    const Waypoints = getWaypoints(viaje.ruta);

    return (
        <div style={{ padding: "20px" }} className="viaje-detalle-container">
            <Typography variant="h4" gutterBottom>
                Detalles del Viaje - {viaje.infoViaje[0]?.idViaje}
            </Typography>
            <Grid container spacing={3}>
               
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Estado del Viaje</Typography>
                            <Typography variant="body1" color={getColorByEstado(estado.trim())}>
                                {estado}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card onClick={handleClickOpenDialog} sx={{cursor:'pointer'}}>
                        <CardContent>
                            <Typography variant="h6">Solicitudes</Typography>
                            <Typography variant="body1">{viaje.infoViaje[0]?.solicitudes} Solicitudes</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Vehículo Asignado</Typography>
                            <Typography variant="body1">
                                {viaje.vehiculo[0]?.modelo} ({viaje.vehiculo[0]?.anoVehiculo}) - {viaje.vehiculo[0]?.color}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle>Lista de Solicitudes</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {viaje.ruta.map((solicitud, index) => (
                        <ListItem key={solicitud.idSolicitudViaje} disableGutters>
                            <ListItemButton onClick={() => navigate(`detalles-solicitud/${solicitud.idSolicitudViaje}`)}>
                                <ListItemText primary={`Solicitud ${index + 1}: N:  ${solicitud.idSolicitudViaje}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>

     
            <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                    Recorrido del Viaje
                </Typography>
                <Paper style={{ height: "400px" }}>
                    <MapContainer center={[19.4326, -99.1332]} zoom={13} style={{ height: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {Waypoints.map((punto, index) => (
                            <Marker key={index} position={[punto[0], punto[1]]}>
                                <Popup>{`Orden: ${index}`}</Popup>
                            </Marker>
                        ))}
                        {viaje.ruta.map((punto, index) => (
                            <RoutingMachine
                                key={index}
                                position="topright"
                                waypoints={[
                                    [parseFloat(punto.lat_origen), parseFloat(punto.lon_origen)],
                                    [parseFloat(punto.lat_destino), parseFloat(punto.lon_destino)],
                                ]}
                                color={getColorByEstado(punto.estadoSolicitud)}
                            />
                        ))}
                    </MapContainer>
                </Paper>
            </div>
            <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                    Empleados Asignados
                </Typography>
                {viaje.empleados.map((empleado, index) => (
                    <Card key={index} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="body1">
                                {empleado.nombre} - {empleado.cargo}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
                        

            <div style={{ marginTop: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEstadoChange("En progreso")}
                >
                    Iniciar Viaje
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEstadoChange("Destino Entregado")}
                >
                    Marcar como Entregado
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEstadoChange("Completado")}
                >
                    Completar Viaje
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleEstadoChange("Cancelado")}
                >
                    Cancelar Viaje
                </Button>
            </div>
        </div>
    );
};

export default ViajeDetalle;
