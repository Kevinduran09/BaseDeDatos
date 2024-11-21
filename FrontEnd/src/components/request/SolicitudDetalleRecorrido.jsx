import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './../map/RoutingControl';
import { useParams } from 'react-router-dom';
import { Loading } from '../../utils/loading';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaMapMarkedAlt } from 'react-icons/fa';

import { getSolocitudDetalle, actualizarEstadoSolicitud } from '../../services/ViajeService';

export const SolicitudDetalleRecorrido = () => {
    const { id, idSolicitud } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [estado, setEstado] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [loading, setLoading] = useState(true);
    const [mapVisible, setMapVisible] = useState(true);

    useEffect(() => {
        if (!idSolicitud || !id) {
            console.error("Los parámetros de la URL no son válidos.");
            Swal.fire('Error', 'Los parámetros de la solicitud son inválidos.', 'error');
            setLoading(false);
            return;
        }

        

        fetchSolicitud();
    }, [id, idSolicitud]);

    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    const fetchSolicitud = async () => {
        try {
            const response = await getSolocitudDetalle(idSolicitud);
            console.log(response);
            setSolicitud(response);
            setEstado(response.estado);
            setLoading(false);
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al obtener la solicitud', 'error');
            setLoading(false);
        }
    };
    const handleObservacionesChange = (event) => {
        setObservaciones(event.target.value);
    };

    const handleGenerarCambio = async () => {
        const data = {
            estado,
            observaciones,
        };
        try {
            const res = await actualizarEstadoSolicitud(idSolicitud, data)
            if (res.status ==200) Swal.fire('Éxito', 'Los cambios se han guardado correctamente', 'success');
            fetchSolicitud()
        } catch (error) {
            Swal.fire('Error', `Hubo un problema al guardar los cambios: ${error}`, 'error');
        }
      
    };

    const toggleMapVisibility = () => {
        setMapVisible(!mapVisible);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: 'auto',
                mt: 4,

                border: 'none',

            }}
        >
            <CardContent>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Detalles de la Solicitud
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Cliente
                        </Typography>
                        <Typography variant="body1">{solicitud.nombre} {solicitud.apellido}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Servicio
                        </Typography>
                        <Typography variant="body1">{solicitud.tipoServicio}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Dirección de Origen
                        </Typography>
                        <Typography variant="body1">{solicitud.direccion_Origen}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Dirección de Destino
                        </Typography>
                        <Typography variant="body1">{solicitud.direccion_Destino}</Typography>
                    </Grid>

                    {/* Nuevos datos */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Hora de Salida
                        </Typography>
                        <Typography variant="body1">{solicitud.hora_salida.split('.')[0] || 'No definida'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Hora de Llegada
                        </Typography>
                        <Typography variant="body1">{solicitud.hora_llegada.split('.')[0] || 'No definida'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Hora Real
                        </Typography>
                        <Typography variant="body1">{solicitud.horaReal ? solicitud.horaReal.split('.')[0] : 'No definida'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Observación del Cliente
                        </Typography>
                        <Typography variant="body1">{solicitud.observacionCliente || 'Sin observaciones'}</Typography>
                    </Grid>

                    {/* Botón para mostrar/ocultar el mapa */}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={toggleMapVisibility}
                            startIcon={<FaMapMarkedAlt />}
                        >
                            {mapVisible ? 'Ocultar Mapa' : 'Ver Mapa'}
                        </Button>
                    </Grid>

                    {/* Animación del mapa */}
                    {mapVisible && (
                        <Grid item xs={12}>
                            <MapContainer
                                center={[solicitud.lat_origen, solicitud.lon_origen]}
                                zoom={13}
                                style={{ height: '500px', width: '100%', borderRadius: '8px', marginTop: '20px' }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[solicitud.lat_origen, solicitud.lon_origen]}>
                                    <Popup>Origen: {solicitud.direccion_Origen}</Popup>
                                </Marker>
                                <Marker position={[solicitud.lat_destino, solicitud.lon_destino]}>
                                    <Popup>Destino: {solicitud.direccion_Destino}</Popup>
                                </Marker>
                                <RoutingMachine
                                    color={'blue'}
                                    position="topright"
                                    waypoints={[[solicitud.lat_origen, solicitud.lon_origen], [solicitud.lat_destino, solicitud.lon_destino]]}
                                />
                            </MapContainer>
                        </Grid>
                    )}

                    {/* Select de estado */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography variant="subtitle1" color="text.secondary">
                                Estado
                            </Typography>
                            <Select value={estado} onChange={handleEstadoChange}>
                                <MenuItem value="Asignada al viaje">Asignada al viaje</MenuItem>
                                <MenuItem value="En progreso">En progreso</MenuItem>
                                <MenuItem value="Origen Recorrido">Origen Recorrido</MenuItem>
                                <MenuItem value="Destino Entregado">Destino Entregado</MenuItem>
                                <MenuItem value="Completado">Completado</MenuItem>
                                <MenuItem value="Cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Campo de observaciones */}
                    <Grid item xs={12}>
                        <TextField
                            label="Observaciones"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={solicitud.observaciones != '' ? solicitud.observaciones : observaciones}
                            onChange={handleObservacionesChange}
                        />
                    </Grid>

                    {/* Botón para guardar */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleGenerarCambio}
                            sx={{ mt: 2 }}
                        >
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Box>
    );
};


