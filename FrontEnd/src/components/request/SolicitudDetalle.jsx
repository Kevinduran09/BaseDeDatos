import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './../map/RoutingControl'; // Importar tu componente de rutas
import { getSolicitud } from '../../services/SolicitudService';
import { useParams } from 'react-router-dom';
import { Loading } from '../../utils/loading';

export const SolicitudDetalle = () => {
    const [solicitud, setSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams()
    useEffect(() => {
        const fetchSolicitudDetails = async () => {
            try {
                const response = await getSolicitud(id);
                setSolicitud(response);
            } catch (error) {
                console.error('Error al obtener los detalles de la solicitud:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudDetails();
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <Card sx={{border:'none',boxShadow:'none'}}>
            <CardContent sx={{ border: 'none' }}>
                <Typography variant="h5">Detalles de la Solicitud</Typography>

                <Grid container spacing={2}>
                    {/* Información del cliente */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Cliente</Typography>
                        <Typography>{solicitud.cliente.nombre} {solicitud.cliente.apellido}</Typography>
                    </Grid>

                    {/* Información del servicio */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Servicio</Typography>
                        <Typography>{solicitud.servicio.tipoServicio}</Typography>
                    </Grid>

                    {/* Direcciones de origen y destino */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Dirección de Origen</Typography>
                        <Typography>{solicitud.origen.nombreDireccion}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Dirección de Destino</Typography>
                        <Typography>{solicitud.destino.nombreDireccion}</Typography>
                    </Grid>

                    {/* Mapa del recorrido */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Recorrido</Typography>
                        <MapContainer
                            center={[solicitud.origen.lat, solicitud.origen.lon]}
                            zoom={13}
                            style={{ height: '500px', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[solicitud.origen.lat, solicitud.origen.lon]}>
                                <Popup>Origen: {solicitud.origen.nombreDireccion}</Popup>
                            </Marker>
                            <Marker position={[solicitud.destino.lat, solicitud.destino.lon]}>
                                <Popup>Destino: {solicitud.destino.nombreDireccion}</Popup>
                            </Marker>

                            {/* Añadir el control de rutas */}
                            <RoutingMachine
                                position="topright"
                                waypoints={[[solicitud.origen.lat, solicitud.origen.lon], [solicitud.destino.lat, solicitud.destino.lon]]}

                                color="blue"
                            />
                        </MapContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
