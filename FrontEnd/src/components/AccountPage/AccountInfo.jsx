import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { getMyInfo, updateMyInfo } from '../../services/ClientService'; // Importa el servicio de cliente
import { useAuthStore } from '../../store/useAuthStore'; // Para obtener currentUser
import { Loading } from '../../utils/loading';
import Swal from 'sweetalert2'; // Importar SweetAlert2

export const AccountInfo = () => {
    const { currentUser } = useAuthStore();
    const methods = useForm({ defaultValues: {} });
    const { control, handleSubmit, reset, register } = methods;

    const [clientInstance, setClientInstance] = useState({});
    const [isTelefonoFijoEnabled, setIsTelefonoFijoEnabled] = useState(false);
    const [isTelefonoMovilEnabled, setIsTelefonoMovilEnabled] = useState(false);
    const [isTelefonoTrabajoEnabled, setIsTelefonoTrabajoEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getMyInfo(currentUser.issCliente);
                if (response) {
                     (response);
                    reset(response);
                    setClientInstance(response);

                    setIsTelefonoFijoEnabled(!!response.telefonoFijo);
                    setIsTelefonoMovilEnabled(!!response.telefonoMovil);
                    setIsTelefonoTrabajoEnabled(!!response.telefonoTrabajo);
                }
            } catch (error) {
                console.error('Error al cargar la información del usuario:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser?.issCliente) {
            fetchUserData();
        }
    }, [currentUser, reset]);

    const onSubmit = async (formData) => {
        try {
            await updateMyInfo(currentUser.issCliente, formData);

            // Usar SweetAlert2 para mostrar el mensaje de éxito
            Swal.fire({
                title: '¡Éxito!',
                text: 'Información actualizada exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            console.error('Error al actualizar la información del usuario:', error);

            // Usar SweetAlert2 para mostrar el mensaje de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar la información',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography m={3} fontWeight={600} variant="h4">Editar Información de Cuenta</Typography>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} sx={{ maxWidth: '600px', width: '100%' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField label={"Nombre"} {...register('nombre')} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label={"Apellido"} {...register('apellido')} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label={"Cédula"} {...register('cedula')} fullWidth disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label={"Correo Electrónico"} {...register('correoElectronico')} type={"email"} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={"Nombre Usuario"} {...register('nombreUsuario')} fullWidth disabled />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={"Contraseña"} {...register('contrasena')} type="password" fullWidth />
                        </Grid>
                    </Grid>

                    {/* Sección de Teléfonos */}
                    <Box mt={3}>
                        <Typography variant="h6">Teléfonos</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={isTelefonoFijoEnabled} onChange={(e) => setIsTelefonoFijoEnabled(e.target.checked)} />
                                    }
                                    label="Habilitar Teléfono Fijo"
                                />
                                {isTelefonoFijoEnabled && <TextField label="Teléfono Fijo" {...register('telefonoFijo')} fullWidth />}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={isTelefonoMovilEnabled} onChange={(e) => setIsTelefonoMovilEnabled(e.target.checked)} />
                                    }
                                    label="Habilitar Teléfono Móvil"
                                />
                                {isTelefonoMovilEnabled && <TextField label="Teléfono Móvil" {...register('telefonoMovil')} fullWidth />}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={isTelefonoTrabajoEnabled} onChange={(e) => setIsTelefonoTrabajoEnabled(e.target.checked)} />
                                    }
                                    label="Habilitar Teléfono Trabajo"
                                />
                                {isTelefonoTrabajoEnabled && <TextField label="Teléfono Trabajo" {...register('telefonoTrabajo')} fullWidth />}
                            </Box>
                        </Box>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Guardar Cambios
                    </Button>
                </form>
            </FormProvider>
        </Box>
    );
};
