import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import useSolicitudStore from '../../store/useSolicitudStore'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './../map/RoutingControl'; 
const Confirmacion = () => {
    const { formData } = useSolicitudStore();


    return (
        <Box p={5}>
            <Typography variant="h4" gutterBottom>
                Confirmación
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
                {/* Información del lado izquierdo */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        {/* Nombre del servicio */}
                        {formData.cliente.idServicio && (
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Servicio: {formData.cliente.servicio.tipoServicio}
                                </Typography>
                            </Grid>
                        )}

                        {/* Dirección de Origen */}
                        {Object.keys(formData.origen).length !== 0 && (
                            <Grid item xs={12}>
                                <Typography variant="h6">Dirección de Origen</Typography>
                                <Typography variant="body1">
                                    {`${formData.origen.estado}, ${formData.origen.ciudad}, ${formData.origen.nombreDireccion}` || 'No se proporcionó nombre de dirección'}
                                </Typography>
                            </Grid>
                        )}

                        {/* Dirección de Destino */}
                        {Object.keys(formData.destino).length !== 0 && (
                            <Grid item xs={12}>
                                <Typography variant="h6">Dirección de Destino</Typography>
                                <Typography variant="body1">
                                    {`${formData.destino.estado}, ${formData.destino.ciudad}, ${formData.destino.nombreDireccion}` || 'No se proporcionó nombre de dirección'}
                                </Typography>
                            </Grid>
                        )}

                        {/* Costo por Kilómetro */}
                        {formData.cliente.idServicio && (
                            <Grid item xs={12}>
                                <Typography variant="h6">Costo por Kilómetro</Typography>
                                <Typography variant="body1">
                                    ${parseFloat(formData.cliente.servicio.PrecioKilometro).toFixed(2)} por km
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {/* Espacio para el mapa del lado derecho */}
                <Grid item xs={12} >
                    <MapContainer
                        center={[formData.origen.direccion[0], formData.origen.direccion[1]]}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[formData.origen.direccion[0], formData.origen.direccion[1]]}>
                            <Popup>Origen: {formData.origen.nombreDireccion}</Popup>
                        </Marker>
                        <Marker position={[formData.destino.direccion[0], formData.destino.direccion[1]]}>
                            <Popup>Destino: {formData.destino.nombreDireccion}</Popup>
                        </Marker>

                        {/* Añadir el control de rutas */}
                        <RoutingMachine
                            position="topright"
                            waypoints={[[formData.origen.direccion[0], formData.origen.direccion[1]], [formData.destino.direccion[0], formData.destino.direccion[1]]]}

                            color="blue"
                        />
                    </MapContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Confirmacion;
