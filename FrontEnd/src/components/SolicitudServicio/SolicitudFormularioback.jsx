import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Grid, FormControl, InputLabel, MenuItem, TextField, Button } from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";
import Select from "@mui/material/Select";
import { getServicesForRequestForm } from '../services/ServicioService';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import LocationSelector from '../components/map/LocationSelector'; // Importa tu componente de mapa
import { FormField } from './FormField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500, md: 600, lg: 700 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const SolicitudFormulario = ({ open, handleClose }) => {
    const methods = useForm();
    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = methods;
    const [servicios, setServicios] = useState([]);
    const [showLocationModal, setShowLocationModal] = useState(false); // Estado para controlar el modal
    const selectedServiceId = watch("servicio");

    useEffect(() => {
        const loadServices = async () => {
            const services = await getServicesForRequestForm();
            if (services) {
                setServicios(services);
            }
        };
        loadServices();

        if (!open) {
            reset();
        }
    }, [open, handleClose, reset]);

    const loadDescripcion = () => {
        return servicios.find(servicio => servicio.idServicio == selectedServiceId)?.descripcionServicio || '';
    };

    const handleOpenLocationModal = () => setShowLocationModal(true);
    const handleCloseLocationModal = () => setShowLocationModal(false);

    const onSubmit = (data) => {
         ("Datos del formulario:", data);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    textAlign={'center'}
                    fontWeight={'bold'}
                    variant="h6"
                >
                    Formulario Solicitud
                </Typography>
                <Box mt={2}>
                    <Typography variant="h6" fontWeight={500}>
                        Información Personal
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} mt={2} padding={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">Nombre: nombre</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">Apellido: Apellido</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Correo Electrónico: correo</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <FormProvider {...methods}>
                    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Box mt={2}>
                            <Typography variant="h6" fontWeight={500}>
                                Información Servicio
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} mt={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={!!errors.servicio}>
                                            <InputLabel>Servicio</InputLabel>
                                            <Select
                                                {...methods.register("servicio")}
                                                label="Servicio"
                                                onChange={(event) => {
                                                    methods.setValue("servicio", event.target.value);
                                                }}
                                            >
                                                {servicios.map((option) => (
                                                    <MenuItem key={option.id} value={option.idServicio}>
                                                        {option.tipoServicio}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.servicio && (
                                                <Typography marginLeft={2} variant="caption" color="error">
                                                    {errors.servicio.message}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                                <DatePicker
                                                    label="Fecha de creación"
                                                    {...methods.register("fechaCreacion")}
                                                    disablePast
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
                                Dirección Origen
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} mt={2}>
                                <Grid container spacing={2}>
                                    {selectedServiceId && servicios.find(servicio => servicio.idServicio == selectedServiceId)?.requiere_origen && (
                                        <>
                                            <Grid item xs={12}>
                                                <Button variant="contained" onClick={handleOpenLocationModal}>
                                                    Seleccionar Dirección de Origen
                                                </Button>
                                                <FormField
                                                    label="Dirección de Origen"
                                                    name="direccionOrigen"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <FormField label="Nombre dirección" name="direccion.nombreDireccion" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormField label="País" name="direccion.pais" isRequerided={true} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormField label="Estado" name="direccion.estado" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormField label="Ciudad" name="direccion.ciudad" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormField label="Distrito" name="direccion.distrito" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormField label="Código Postal" name="direccion.codigoPostal" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    label="Dirección Completa"
                                                    name="direccion.direccionCompleta"
                                                    multiline
                                                    rows={2}
                                                />
                                            </Grid>
                                            <LocationSelector
                                                open={showLocationModal}
                                                onClose={handleCloseLocationModal}
                                                onSelect={(pos) => {
                                                    setValue("direccionOrigen", pos);
                                                    handleCloseLocationModal();
                                                }}
                                            />
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Box>

                        <Box mt={3} textAlign="center">
                            <Button type="submit" variant="contained">Enviar</Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Box>
        </Modal>
    );
};
