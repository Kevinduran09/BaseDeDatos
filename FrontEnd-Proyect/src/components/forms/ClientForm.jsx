import { InputLabel, Select, MenuItem, Input, FormControl, Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

export const ClientForm = ({ register, handleSave, errors, control,getValues }) => {
    return (
        <>
            <form onSubmit={handleSave} id='client-form'>
                <Grid container spacing={3} justifyContent={'center'} sx={{ width: '100%' }}>
                    <input type="hidden" {...register('idCliente')} />
                    <Grid item >
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel htmlFor="component-simple">Cédula</InputLabel>
                            <Input id="component-simple" {...register('cedula', { required: 'Cédula es obligatoria' })} />
                            {errors.cedula && <span className='requiredAlert'>{errors.cedula.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Nombre</InputLabel>
                            <Input id="component-simple" {...register('nombre', { required: 'Nombre es obligatorio' })} />
                            {errors.nombre && <span className='requiredAlert'>{errors.nombre.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Apellido</InputLabel>
                            <Input id="component-simple" {...register('apellido', { required: 'Apellido es obligatorio' })} />
                            {errors.apellido && <span className='requiredAlert'>{errors.apellido.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Correo Electrónico</InputLabel>
                            <Input id="component-simple" {...register('correoElectronico', {
                                required: 'Correo electrónico es requerido', pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Correo electrónico no es válido"
                                }
                            })} />
                            {errors.correoElectronico && <span className='requiredAlert'>{errors.correoElectronico.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ width: '100%', paddingX: '20px' }}>
                            <InputLabel sx={{ paddingX: '23px' }} htmlFor="component-simple">Dirección</InputLabel>
                            <Input id="component-simple" {...register('direccion', { required: 'Dirección es requerida' })} />
                            {errors.direccion && <span className='requiredAlert'>{errors.direccion.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Teléfono</InputLabel>
                            <Input id="component-simple" {...register('numeroTelefono', {
                              
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Solo se permiten números'
                                }
                            })} />
                            {errors.numeroTelefono && <span className='requiredAlert'>{errors.numeroTelefono.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Controller
                            control={control}
                            name='tipoTelefono'
                            defaultValue={0}
                            rules={{
                                required: getValues('numeroTelefono') ? 'Tipo de teléfono es obligatorio' : false,
                                validate: value => value !== 0 || !getValues('numeroTelefono') || 'Debe seleccionar un tipo válido'
                            }}

                            render={({ field }) => (
                                <>
                                    <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
                                        <InputLabel htmlFor="select-tipo-telefono">Tipo Teléfono</InputLabel>
                                        <Select
                                            labelId="select-tipo-telefono"
                                            id="select-tipo-telefono"
                                            label="Tipo Teléfono"
                                            defaultValue={null}
                                            value={field.value}
                                            onChange={(data) => field.onChange(data)}
                                        >
                                            <MenuItem value={0}><em></em></MenuItem>
                                            <MenuItem value={'personal'}>Personal</MenuItem>
                                            <MenuItem value={'fijo'}>Fijo</MenuItem>
                                            <MenuItem value={'casa'}>Casa</MenuItem>
                                            <MenuItem value={'oficina'}>Oficina</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.tipoTelefono && <span className='requiredAlert'>{errors.tipoTelefono.message}</span>}
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Nombre de usuario</InputLabel>
                            <Input id="component-simple" {...register('nombreUsuario', { required: 'Usuario es requerido' })} />
                            {errors.nombreUsuario && <span className='requiredAlert'>{errors.nombreUsuario.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Contraseña</InputLabel>
                            <Input id="component-simple" {...register('contrasena', { required: 'Contraseña es requerida' })} />
                            {errors.contrasena && <span className='requiredAlert'>{errors.contrasena.message}</span>}
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
