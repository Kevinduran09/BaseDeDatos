import React from 'react'
import { Grid } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
export const ClientForm = ({ register, handleSave, errors }) => {


    return (
        <>
            <form onSubmit={handleSave} id='client-form'>
            
            <Grid container spacing={3} justifyContent={'center'} sx={{width:'100%'}}>
                <Grid item >
                    <FormControl variant="standard" sx={{width:'100%'}}>
                        <InputLabel htmlFor="component-simple">Cedula</InputLabel>
                        <Input id="component-simple" {...register('cedula',{required:'Cedula es obligatorio'})} />
                            {errors.cedula && <span className='requiredAlert'>{errors.cedula.message}</span>}
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Nombre</InputLabel>
                        <Input id="component-simple" {...register('nombre',{required:'Nombre es obligatorio'})} />
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
                        <InputLabel htmlFor="component-simple">CorreoElectronico</InputLabel>
                            <Input id="component-simple" {...register('correoElectronico', {
                                required: 'Correo electrónico requerido', pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Correo electrónico no es válido"
                                } })} />
                            {errors.correoElectronico && <span className='requiredAlert'>{errors.correoElectronico.message}</span>}
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Direccion</InputLabel>
                            <Input id="component-simple" {...register('direccion',{required:'Direccion es requerida'})} />
                            {errors.direccion && <span className='requiredAlert'>{errors.direccion.message}</span>}
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Telefono</InputLabel>
                            <Input id="component-simple" {...register('telefono',{required:'Telefono requerido'})} />
                            {errors.telefono && <span className='requiredAlert'>{errors.telefono.message}</span>}
                    </FormControl>
                </Grid>
            </Grid>
            </form>

        </>
    )
}
