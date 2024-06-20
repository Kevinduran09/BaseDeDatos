import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    TextField, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem, List, ListItem,
    IconButton, ListItemText 

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { showMsj } from '../../functions';
import { useForm, Controller } from 'react-hook-form';
import adminAPI from '../../Api/AdminAPI';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
export const RecorridoForm = () => {
    const { register, handleSubmit, control, setValue, watch } = useForm();
    const [empleados, setEmpleados] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [selectedEmpleados, setSelectedEmpleados] = useState([]);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const [viajeExistente, setViajeExistente] = useState(null);
    const { id } = useParams();
    const [solicitud, setsolicitud] = useState({});
    const navegate = useNavigate()
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await adminAPI.getEmployes();
                let datos = response.data.filter(empleado => empleado.puesto.cargo !== 'Secretario' && empleado.puesto.cargo !== 'Contador' && empleado.puesto.cargo !== 'Administrador');
                setEmpleados(datos);
            } catch (error) {
                console.error('Error fetching empleados', error);
            }
        };

        const fetchVehiculos = async () => {
            try {
                const response = await adminAPI.getVehicles();
                setVehiculos(response.data);
                setSelectedVehiculo(response.data[0].idVehiculo)

            } catch (error) {
                console.error('Error fetching vehiculos', error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await adminAPI.getRequest(id);
                setsolicitud(response.data);

                // Establecer valores iniciales en el formulario usando setValue
                setValue('nombre', response.cliente.nombre);
                setValue('apellido', response.cliente.apellido);
                setValue('numeros', response.cliente.telefonos.map(t => t.numeroTelefono).join(', '));
                setValue('correoElectronico', response.cliente.correoElectronico);
                setValue('cedula', response.cliente.cedula);
                setValue('nombreDestino', response.destino.descripcionValor);
                setValue('direccion', response.destino.direccionFisica);
                setValue('pais', response.destino.pais);
                setValue('provincia', response.destino.provincia);
                setValue('ciudad', response.destino.ciudad);
                setValue('hora', response.fecha);
                setValue('observacion', response.observacion);
                setValue('estado', response.estado);
                setValue('idCliente', response.idCliente);
                setValue('idSolicitud', response.idSolicitud);

                // Buscar viaje existente para la misma fecha
                const fechaViaje = dayjs(response.fecha).format('YYYY-MM-DD');
                const viajes = await adminAPI.getViajeByFecha(fechaViaje);
                console.log(viajes);
                if (viajes.length > 0) {
                    const viajeEncontrado = viajes[0]; // Tomar el primer viaje encontrado, puedes ajustar la lógica según tus necesidades
                    setViajeExistente(viajeEncontrado);
                    setSelectedEmpleados(viajeEncontrado.empleados);
                    setSelectedVehiculo(viajeEncontrado.vehiculo);
                }

            } catch (error) {
                console.error('Error fetching request or existing viaje:', error);
            }
        };

        fetchData();
        fetchEmpleados();
        fetchVehiculos();
    }, []);

    const handleAddEmpleado = (empleado) => {
        setSelectedEmpleados([...selectedEmpleados, empleado]);
    };

    const selectee = (id) => {
        setSelectedVehiculo(id)
    }

    const handleProcesarRecorrido = async (formData) => {
        if (selectedVehiculo === '' || selectedEmpleados.length === 0) {
            showMsj('Debe seleccionar al menos un vehículo y un empleado', 'error');
            return;
        }

        let viaje = null;

        try {
            console.log(formData.hora);
            const res = await adminAPI.getViajeByFecha(dayjs(formData.hora).format('YYYY-MM-DD'));
            console.log(res);
            if (res.length > 0) {
                const existingViajes = res;
                console.log(existingViajes);
                console.log(watch('hora'));
                const availableViaje = existingViajes.find(viaje =>
                    !viaje.recorridos.some(recorrido => new Date(recorrido.solicitud.fecha).getTime() === new Date(formData.hora).getTime())
              
                );
                console.log(availableViaje);
                if (availableViaje) {
                    viaje = availableViaje;
                }
            }

            if (!viaje) {
                console.log('dkdlf');
                viaje = await adminAPI.createViaje({
                    fechaViaje: formData.hora,
                    idVehiculo: selectedVehiculo,
                    empleados: selectedEmpleados.map(empleado => empleado.idEmpleado),
                });
            }

        } catch (error) {
            console.error('Error fetching or creating viaje:', error);
            showMsj('Error procesando el viaje', 'error');
            return;
        }

        try {
            console.log(viaje);
            const recorridoData = {
                idViaje: viaje.idViaje,
                ...formData
            };
            await adminAPI.createRecorrido(recorridoData);
            showMsj('Creado con éxito el recorrido', 'success');
            navegate('/admin');
        } catch (error) {
            console.error('Error processing recorrido', error);
            showMsj('Error procesando el recorrido', 'error');
        }
    };

    const handleRemoveEmpleado = (index) => {
        const newSelectedEmpleados = [...selectedEmpleados];
        newSelectedEmpleados.splice(index, 1);
        setSelectedEmpleados(newSelectedEmpleados);
    };

    return (
        <div className="container pt-5">
            <form onSubmit={handleSubmit(handleProcesarRecorrido)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="empleado-select-label">Seleccionar Empleados</InputLabel>
                            <Select
                                labelId="empleado-select-label"
                                label="Seleccionar Empleados"
                                value={selectedEmpleados}
                                onChange={(e) => handleAddEmpleado(e.target.value)}
                                disabled={!!viajeExistente}
                            >
                                {empleados.map((empleado) => (
                                    <MenuItem key={empleado.idEmpleado} value={empleado}>
                                        {`${empleado.nombre} - ${empleado.puesto.cargo}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <List>
                            {viajeExistente ? (
                                selectedEmpleados.map((empleado, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`${empleado.nombre} ${empleado.apellido} - ${empleado.puesto.cargo}`} />
                                    </ListItem>
                                ))
                            ) : (
                                selectedEmpleados.map((empleado, index) => (
                                    <ListItem key={index} secondaryAction={
                                        <IconButton color='error' edge="end" aria-label="delete" onClick={() => handleRemoveEmpleado(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
                                        <ListItemText primary={`${empleado.nombre} ${empleado.apellido} - ${empleado.puesto.cargo}`} />
                                    </ListItem>
                                ))
                            )}
                        </List>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="vehiculo-select-label">Seleccionar Vehículo</InputLabel>
                            <Select
                                labelId="vehiculo-select-label"
                                label="Seleccionar Vehículo"
                                value={selectedVehiculo}
                                onChange={(e) => selectee(e.target.value)}
                                disabled={!!viajeExistente}
                            >
                                {vehiculos.map((vehiculo) => (
                                    <MenuItem key={vehiculo.idVehiculo} value={vehiculo.idVehiculo}>
                                        {`Vehículo: ${vehiculo.tipoVehiculo} - Placa: ${vehiculo.placa}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                      
                    </Grid>
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
                    <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '10px' }} >
                        <Button type="submit" variant="contained" color="primary">
                            Procesar Recorrido
                        </Button>
                        <Button onClick={()=>navegate(-1)} variant="contained" color="secondary">
                           Volver
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
