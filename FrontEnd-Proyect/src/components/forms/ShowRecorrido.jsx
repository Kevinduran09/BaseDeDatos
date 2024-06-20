import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    TextField, Grid, Typography, Button

} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { showMsj } from '../../functions';
import { useForm } from 'react-hook-form';
import adminAPI from '../../Api/AdminAPI';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ShowRecorrido = () => {
    const storedAuth = JSON.parse(sessionStorage.getItem('current'));
    const userRole = storedAuth?.cargo;
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSolicitud = async () => {
            try {
                const response = await adminAPI.getRecorrido(id);
                console.log(response);
                setSolicitud(response);

                // Set initial form values using setValue
                setValue('nombre', response.cliente.nombre);
                setValue('apellido', response.cliente.apellido);
                setValue('numeros', response.cliente.telefonos.map(t => t.numeroTelefono).join(', '));
                setValue('correoElectronico', response.cliente.correoElectronico);
                setValue('cedula', response.cliente.cedula);
                setValue('nombreDestino', response.solicitud.destino.descripcionValor);
                setValue('direccion', response.solicitud.destino.direccionFisica);
                setValue('pais', response.solicitud.destino.pais);
                setValue('provincia', response.solicitud.destino.provincia);
                setValue('ciudad', response.solicitud.destino.ciudad);
                setValue('hora', response.solicitud.fecha);
                setValue('observacion', response.solicitud.observacion);
                setValue('estado', response.estado);
                setValue('idCliente', response.cliente.idCliente);
                setValue('idSolicitud', response.idSolicitud);
            } catch (error) {
                console.error('Error fetching request', error);
            }
        };

        fetchSolicitud();
    }, [id, setValue]);

    const handleProcesar = async (formData) => {


        if (userRole == 'Administrador') {
            if (formData.estado !== 'pendiente') {
                showMsj('El estado no es pendiente. No se puede procesar.');
                return;
            }

            try {
                const recorridoData = {
                    ...formData,
                };

                await adminAPI.createRecorrido(recorridoData);
                showMsj('Creado con éxito el recorrido');
                navigate('/admin');
            } catch (error) {
                console.error('Error processing recorrido', error);
            }
        }

        if (userRole == 'Chofer') {
            try {
                

                await adminAPI.completarRecorrido(formData.idSolicitud);
                showMsj('Se completo el recorrido!');
                navigate('/admin');
            } catch (error) {
                console.error('Error processing recorrido', error);
                show_alert({ icon: 'error', title: 'No se pudo completar el recorrido por alguna razon' });
            }
        }



    };

    return (
        <div className="container pt-5">
            <form onSubmit={handleSubmit(handleProcesar)}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Información del Cliente</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2} sx={{ width: '100%' }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            {...register('nombre')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            {...register('apellido')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Número(s)"
                                            variant="outlined"
                                            {...register('numeros')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Correo Electrónico"
                                            variant="outlined"
                                            {...register('correoElectronico')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Cédula"
                                            variant="outlined"
                                            {...register('cedula')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Información del Destino</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            {...register('nombreDestino')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Dirección"
                                            variant="outlined"
                                            {...register('direccion')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Provincia"
                                            variant="outlined"
                                            {...register('provincia')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Ciudad"
                                            variant="outlined"
                                            {...register('ciudad')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="País"
                                            variant="outlined"
                                            {...register('pais')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Información General</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Hora"
                                            variant="outlined"
                                            {...register('hora')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Observación"
                                            variant="outlined"
                                            {...register('observacion')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Estado"
                                            variant="outlined"
                                            {...register('estado')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '10px' }}>

                        {userRole == 'Administrador' ? (
                            <Button type="submit" variant="contained" color="primary">
                                Procesar Recorrido
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained" color="primary">
                                Completar Recorrido
                            </Button>
                        )}



                        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                            Volver
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
