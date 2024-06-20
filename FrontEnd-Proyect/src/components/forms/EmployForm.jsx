
import { Controller } from 'react-hook-form';
import { Grid, Select, MenuItem, Input, InputLabel, FormControl, TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
export const EmployForm = ({ register, handleSave, errors, control }) => {

    const data = [
        { id: 1, puesto: 'Administrador' },
        { id: 2, puesto: 'Chofer' },
        { id: 3, puesto: 'Custodio' },
        { id: 4, puesto: 'Secretario' },
        { id: 5, puesto: 'Contador' }
    ];

    return (
        <form onSubmit={handleSave} id="employ-form">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={3}>
                    <input type="hidden" {...register('idEmpleado')} />
                    <Grid item>
                        <Controller
                            control={control}
                            name='idPuesto'
                            defaultValue={0}
                            rules={{ required: 'Puesto es obligatorio', validate: value => value != 0 || 'Debe seleccionar un puesto valido' }}
                            render={({ field }) => (
                                <>
                                    <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Puesto</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            defaultValue={null}

                                            label="Puesto"
                                            value={field.value}
                                            onChange={(data) => field.onChange(data)}
                                        >
                                            <MenuItem value={0}>
                                                <em></em>
                                            </MenuItem>
                                            {data.map((puesto) => (
                                                <MenuItem
                                                    key={puesto.id}
                                                    value={puesto.id}
                                                >
                                                    {puesto.puesto}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </>

                            )}
                        >

                        </Controller>
                        {errors.idPuesto && <span className="requiredAlert">{errors.idPuesto.message}</span>}

                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <Input id="nombre" {...register('nombre', { required: 'Nombre es obligatorio' })} />
                            {errors.nombre && <span className="requiredAlert">{errors.nombre.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="apellido">Apellido</InputLabel>
                            <Input id="apellido" {...register('apellido', { required: 'Apellido es obligatorio' })} />
                            {errors.apellido && <span className="requiredAlert">{errors.apellido.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="cedula">Cedula</InputLabel>
                            <Input id="cedula" {...register('cedula', { required: 'Cedula es obligatorio' })} />
                            {errors.cedula && <span className="requiredAlert">{errors.cedula.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="correoElectronico">Correo Electrónico</InputLabel>
                            <Input id="correoElectronico" {...register('correoElectronico', {
                                required: 'Correo electrónico es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Correo electrónico no es válido"
                                }
                            })} />
                            {errors.correoElectronico && <span className="requiredAlert">{errors.correoElectronico.message}</span>}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="telefono">Teléfono</InputLabel>
                            <Input id="telefono" {...register('telefono', { required: 'Teléfono es obligatorio' })} />
                            {errors.telefono && <span className="requiredAlert">{errors.telefono.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ width: '100%', paddingX: '20px' }}>
                            <InputLabel sx={{ paddingX: '23px' }} htmlFor="component-simple">Dirección</InputLabel>
                            <Input id="component-simple" {...register('direccion', { required: 'Dirección es requerida' })} />
                            {errors.direccion && <span className='requiredAlert'>{errors.direccion.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="fechaNacimiento"
                            control={control}
                            defaultValue={null}
                            rules={{ required: 'Fecha de nacimiento es obligatoria' }}

                            render={({ field }) => (
                                <DatePicker
                                    inputFormat="DD/MM/YYYY"
                                    label="Fecha de Nacimiento"

                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) => field.onChange(date.toISOString())} // Convertir la fecha a formato ISO antes de establecerla en el campo
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                />
                            )}
                        />
                        {errors.fechaNacimiento && <span className="requiredAlert">{errors.fechaNacimiento.message}</span>}
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="fechaContratacion"
                            control={control}
                            defaultValue={null}
                            rules={{ required: 'Fecha de contratación es obligatoria' }}
                            render={({ field }) => (
                                <DatePicker
                                    inputFormat="DD/MM/YYYY"
                                    label="Fecha de Contratación"
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) => field.onChange(date.toISOString())} // Convertir la fecha a formato ISO antes de establecerla en el campo
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                />
                            )}
                        />
                        {errors.fechaContratacion && <span className="requiredAlert">{errors.fechaContratacion.message}</span>}
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Nombre de usuario</InputLabel>
                            <Input id="component-simple" {...register('nombreUsuario', { required: 'Usuario requerido' })} />
                            {errors.nombreUsuario && <span className='requiredAlert'>{errors.nombreUsuario.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">contraseña</InputLabel>
                            <Input id="component-simple" {...register('contrasena', { required: 'contraseña requerido' })} />
                            {errors.contrasena && <span className='requiredAlert'>{errors.contrasena.message}</span>}
                        </FormControl>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </form>
    );
};
