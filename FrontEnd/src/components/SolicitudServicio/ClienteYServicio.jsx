import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, MenuItem, TextField, Select } from '@mui/material';
import { getAllServices } from '../../services/ServicioService';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useSolicitudStore from '../../store/useSolicitudStore'; // Importa el store de Zustand
import dayjs from 'dayjs';
import { useAuthStore } from '../../store/useAuthStore';
const ClienteYServicio = ({ handleValidationChange }) => {
    const { formData, updateFormData } = useSolicitudStore(); // Usa el estado y la función para actualizar desde el store
    const [servicios, setServicios] = useState([]);
    const [selectedService, setSelectedService] = useState(formData.cliente.servicio || null);
    const [observacion, setObservacion] = useState(formData.cliente.observacion || '');
    const [fecha, setFecha] = useState(formData.cliente.fechaCreacion || null);
    const {perfil} =useAuthStore()
    useEffect(() => {
        const loadServices = async () => {
            const services = await getAllServices();
            if (services) {
                setServicios(services);
            }
        };
        loadServices();
    }, []);
    console.log(perfil);
    
    const handleServiceChange = (event) => {
        const serviceId = event.target.value;
        const service = servicios.find((s) => s.idServicio === serviceId);
        setSelectedService(service);
        updateFormData('cliente', { idServicio: serviceId, servicio: service });
    };

    const handleObservacionChange = (e) => {
        const { value } = e.target;
        setObservacion(value);
        updateFormData('cliente', { ...formData.cliente, observacion: value });
    };

    const handleFechaChange = (newValue) => {
        setFecha(newValue);
        updateFormData('cliente', { ...formData.cliente, fechaCreacion: newValue });
    };

    // Llamada a handleValidationChange para habilitar/deshabilitar la continuación
    const validateForm = useCallback(() => {
        const isValid = selectedService && fecha; // Asegúrate de que tanto el servicio como la fecha estén seleccionados
        handleValidationChange(isValid);
    }, [selectedService, fecha, handleValidationChange]);

    // Llama a la validación cada vez que cambien el servicio o la fecha
    useEffect(() => {
        validateForm();
    }, [selectedService, fecha, validateForm]);

    return (
        <Box mt={2} padding={5}>
            <Box>
                <Typography variant="h6" fontWeight={500}>
                    Información Personal
                </Typography>
                <Box sx={{ flexGrow: 1 }} mt={2} padding={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Nombre: {perfil.nombre}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Apellido: {perfil.apellido}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Correo Electrónico: {perfil.correoElectronico}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mt={2}>
                <Typography variant="h6" fontWeight={500}>
                    Información Servicio
                </Typography>
                <Box sx={{ flexGrow: 1 }} mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Servicio</InputLabel>
                                <Select
                                    label="Servicio"
                                    value={selectedService ? selectedService.idServicio : ''}
                                    onChange={handleServiceChange}
                                >
                                    {servicios.map((option) => (
                                        <MenuItem key={option.idServicio} value={option.idServicio}>
                                            {option.tipoServicio}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                    <DateTimePicker
                                        label="Fecha y Hora Estimada"
                                        value={fecha}
                                        onChange={handleFechaChange}
                                        disablePast
                                        shouldDisableTime={(timeValue, clockType) => {
                                            if (clockType === 'hours') {
                                                // Crea un objeto dayjs con la hora actual para comparaciones precisas
                                                const currentHour = dayjs().hour(timeValue).minute(0);

                                                // Establece los límites de horas válidas (por ejemplo, 9 a.m. a 5 p.m.)
                                                const startHour = dayjs().hour(9).minute(0);
                                                const endHour = dayjs().hour(17).minute(59);

                                                // Desactiva horas fuera del rango de 9 a.m. a 5 p.m.
                                                return currentHour.isBefore(startHour) || currentHour.isAfter(endHour);
                                            }
                                            return false;
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mt={2}>
                <Typography variant="h6" fontWeight={500}>
                    Observación
                </Typography>
                <TextField
                    fullWidth
                    label="Observación"
                    variant="outlined"
                    value={observacion}
                    onChange={handleObservacionChange}
                />
            </Box>
        </Box>
    );
};

export default ClienteYServicio;
