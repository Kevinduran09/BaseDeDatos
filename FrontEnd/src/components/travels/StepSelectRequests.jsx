import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Typography, Button, TextField, Card, CardContent, CardActions } from '@mui/material';
import { getSolicitudesbyDate, verificarAlcance } from '../../services/SolicitudService';
import { useNavigate } from 'react-router-dom';


import {useViajeStore}  from '../../store/useViajeStore';

// Importa lo necesario para DatePicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Swal from 'sweetalert2';
import { Loading } from '../../utils/loading';

export const StepSelectRequests = ({ onValidation }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [fecha, setFecha] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [solicitudesConEstado, setSolicitudesConEstado] = useState([]);
    const navigate = useNavigate();

    
    const {toggleRequestSelection, selectedRequests, setFechaViaje} = useViajeStore();

    const handleFechaChange = (newValue) => {
        setFecha(newValue);
    };

  
    const handleConsultar = async () => {
        if (fecha) {
            setLoading(true);
            try {
                const filteredSolicitudes = await getSolicitudesbyDate({ 'fecha': fecha.format('YYYY-MM-DD') });
                setSolicitudes(filteredSolicitudes);
                setIsFetched(true);
                setFechaViaje(fecha.format('YYYY-MM-DD'))
                const solicitudesEstado = filteredSolicitudes.map((solicitud) => ({
                    ...solicitud,
                    estado: 'noSeleccionada',
                }));
                setSolicitudesConEstado(solicitudesEstado);
            } catch (error) {
                console.error("Error al consultar solicitudes:", error);
            } finally {
                setLoading(false);
            }
        }
    };

   
    const handleSelectRequest = (requestId, isSelected) => {
        toggleRequestSelection(requestId, isSelected); 

       
        setSolicitudesConEstado((prevState) =>
            prevState.map((solicitud) =>
                solicitud.idSolicitud === requestId
                    ? { ...solicitud, estado: isSelected ? 'seleccionada' : 'noSeleccionada' }
                    : solicitud
            )
        );
    };

    
    const handleVerDetalle = (solicitudId) => {
        navigate(`/app/requests/ver/${solicitudId}`);
    };

   
    const handleSubmit = async () => {
        const requestData = selectedRequests;
         (requestData.length == 0);
        
        if (requestData.length ==0){
            Swal.fire({
                title: 'Error',
                text: 'Debe seleccionar alguna solicitud para continuar.',
                icon: 'error',
            });
            return
        }
        try {
            const response = await verificarAlcance(requestData);
            if (response.todasAlcanzadas) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Todas las solicitudes son alcanzables.',
                    icon: 'success',
                });
                onValidation(requestData.length > 0);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Algunas solicitudes están solapadas o no alcanzables.',
                    icon: 'error',
                });
            }
            changeStateRequest(response.resultado)
        } catch (error) {
            console.error("Error al verificar alcance", error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al verificar las solicitudes.',
                icon: 'error',
            });
        }
    };

    const changeStateRequest = (requests) => {
        const updatedSolicitudes = solicitudesConEstado.map((solicitud) => {
            const result = requests.find(r => r.id_solicitud === solicitud.idSolicitud);

            if (!result) return solicitud;

            if (result.alcanzable) {
                return { ...solicitud, estado: 'alcanzada' };
            } else {
                return { ...solicitud, estado: 'noAlcanzada' };
            }
        });

        setSolicitudesConEstado(updatedSolicitudes);
    };

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Seleccione las solicitudes para el viaje</Typography>

            <Box gap={4} display={'flex'} flexWrap={'wrap'}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker
                        fullWidth
                        label="Consultar fecha"
                        value={fecha}
                        onChange={handleFechaChange}
                        disablePast
                        renderInput={(params) => <TextField {...params} margin="normal" required />}
                    />
                </LocalizationProvider>

                <Button
                    variant="contained"
                    onClick={handleConsultar}
                    disabled={!fecha || loading}
                >
                    Consultar
                </Button>
            </Box>

            {loading ? (
              <Loading/>
            ) : (
                <Box mt={2}>
                    {isFetched ? (
                        solicitudes.length > 0 ? (
                            solicitudesConEstado.map((solicitud) => (
                                <Card key={solicitud.id} sx={{ mb: 2, borderLeft: `5px solid ${getBorderColor(solicitud.estado)}` }}>
                                    <CardContent>
                                        <Typography variant="body1">
                                            {`${solicitud.tipoServicio} - ${new Date(solicitud.fecha).toLocaleString()}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedRequests.includes(solicitud.idSolicitud)}
                                                    onChange={(e) => handleSelectRequest(solicitud.idSolicitud, e.target.checked)}
                                                />
                                            }
                                            label="Seleccionar"
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleVerDetalle(solicitud.idSolicitud)}
                                        >
                                            Ver detalle
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            <Typography>No se encontraron solicitudes para la fecha seleccionada.</Typography>
                        )
                    ) : (
                        <Typography>Por favor, seleccione una fecha y haga clic en "Consultar".</Typography>
                    )}
                </Box>
            )}

            <Button onClick={handleSubmit} disabled={solicitudesConEstado.length==0 } variant="contained" sx={{ mt: 2 }}>
                Continuar
            </Button>
        </Box>
    );
};

// Función para determinar el color del borde
const getBorderColor = (estado) => {
    switch (estado) {
        case 'alcanzada':
            return 'green';
        case 'noAlcanzada':
            return 'red';
        case 'seleccionada':
            return 'blue';
        default:
            return 'gray';
    }
};
