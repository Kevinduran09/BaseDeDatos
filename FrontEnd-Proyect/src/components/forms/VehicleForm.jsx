import React from 'react';
import { Grid, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

export const VehicleForm = ({ register, handleSave, errors, control }) => {
    return (
        <>
            <form onSubmit={handleSave} id='vehicle-form'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <input type="hidden" {...register('idVehiculo')} />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="tipoVehiculo">Tipo Vehículo</InputLabel>
                                <Input id="tipoVehiculo" {...register('tipoVehiculo', { required: 'Tipo de vehículo es obligatorio' })} />
                                {errors.tipoVehiculo && <FormHelperText error>{errors.tipoVehiculo.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="placa">Placa</InputLabel>
                                <Input id="placa" {...register('placa', { required: 'Placa es obligatoria' })} />
                                {errors.placa && <FormHelperText error>{errors.placa.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="capacidad">Capacidad</InputLabel>
                                <Input type='number' min='1' max='6' id="capacidad" {...register('capacidad', { required: 'Capacidad es obligatoria' })} />
                                {errors.capacidad && <FormHelperText error>{errors.capacidad.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="modelo">Modelo</InputLabel>
                                <Input id="modelo" {...register('modelo', { required: 'Modelo es obligatorio' })} />
                                {errors.modelo && <FormHelperText error>{errors.modelo.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <Controller
                                    name="fechaCompra"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: 'Fecha de compra es obligatoria' }}
                                    render={({ field }) => (
                                        <DatePicker
                                            views={['year','month','day']}
                                            label="Fecha de Compra"
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                                            renderInput={(params) => (
                                                <Input {...params.inputProps} variant="standard" />
                                            )}
                                        />
                                    )}
                                />
                                {errors.fechaCompra && <FormHelperText error>{errors.fechaCompra.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <Controller
                                    name="anoVehiculo"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: 'Año del vehículo es obligatorio' }}
                                    render={({ field }) => (
                                        <DatePicker
                                            views={['year']}
                                            label="Año del Vehículo"
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                                            renderInput={(params) => (
                                                <Input {...params.inputProps} variant="standard" />
                                            )}
                                        />
                                    )}
                                />
                                {errors.anoVehiculo && <FormHelperText error>{errors.anoVehiculo.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="fichaTecnica" >Ficha Técnica</InputLabel>
                                <Input multiline  id="fichaTecnica" {...register('fichaTecnica', { required: 'Ficha técnica es obligatoria' })} />
                                {errors.fichaTecnica && <FormHelperText error>{errors.fichaTecnica.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </form>
        </>
    );
};
