import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Box } from '@mui/material';
import LocationSelector from '../map/LocationSelector'; // Componente de mapa para la selección de coordenadas
import useSolicitudStore from '../../store/useSolicitudStore'; // Importa tu store existente

const DireccionForm = ({ tipo, handleValidationChange }) => {
    // Obtén el estado y la función de actualización desde el store
    const { formData, updateFormData } = useSolicitudStore();

    // Estado local para controlar el modal
    const [openModal, setOpenModal] = useState(false);

    // Función para manejar cambios en los campos de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData(tipo, { [name]: value });
    };

    // Función para abrir el modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Función para manejar la selección de coordenadas desde el mapa
    const handleLocationSelect = (coords) => {
        updateFormData(tipo, { direccion: coords });
        handleCloseModal();
    };

    // Mostrar coordenadas seleccionadas en el campo de dirección
    const direccion = formData[tipo]?.direccion
        ? `${formData[tipo].direccion[0]}, ${formData[tipo].direccion[1]}`
        : '';

    // Función para verificar si todos los campos están llenos
    const isFormValid = () => {
        const direccionData = formData[tipo] || {};
        return direccionData.nombreDireccion && direccionData.pais && direccionData.estado &&
            direccionData.ciudad && direccionData.distrito && direccionData.codigoPostal &&
            direccionData.direccion; // Verifica si la dirección está llena (coordenadas seleccionadas)
    };

    // Actualiza la validación en el store
    useEffect(() => {
        handleValidationChange(isFormValid());
    }, [formData, tipo, handleValidationChange]);

    return (
        <Box p={5}>
            <h2>{tipo === 'origen' ? 'Dirección de Origen' : 'Dirección de Destino'}</h2>

            {/* Campos de texto para la dirección */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleOpenModal}>
                        Seleccionar {tipo === 'origen' ? 'Dirección de Origen' : 'Dirección de Destino'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={tipo === 'origen' ? 'Dirección de Origen' : 'Dirección de Destino'}
                        name="coordenadas"
                        value={direccion}
                        disabled
                        fullWidth
                    />
                </Grid>

                {/* Otros campos para la dirección */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nombre Dirección"
                        name="nombreDireccion"
                        value={formData[tipo]?.nombreDireccion || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="País"
                        name="pais"
                        value={formData[tipo]?.pais || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Estado"
                        name="estado"
                        value={formData[tipo]?.estado || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Ciudad"
                        name="ciudad"
                        value={formData[tipo]?.ciudad || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Distrito"
                        name="distrito"
                        value={formData[tipo]?.distrito || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Código Postal"
                        name="codigoPostal"
                        value={formData[tipo]?.codigoPostal || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <LocationSelector
                open={openModal}
                onClose={handleCloseModal}
                onSelect={handleLocationSelect}
            />
        </Box>
    );
};

export default DireccionForm;
