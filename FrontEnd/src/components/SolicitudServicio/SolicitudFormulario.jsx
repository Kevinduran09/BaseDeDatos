import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import ClienteYServicio from './ClienteYServicio';
import DireccionForm from './DireccionForm';
import Confirmacion from './Confirmacion';
import useSolicitudStore from '../../store/useSolicitudStore';
import { createSolicitudCliente } from '../../services/ServicioService';
import dayjs from 'dayjs';
import { useAuthStore } from '../../store/useAuthStore';
export const SolicitudFormulario = ({ open, handleClose }) => {
    const { formData, resetFormData } = useSolicitudStore();
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState(['Información del Cliente y Servicio']);
    const [loading, setLoading] = useState(false);  
    const [isStepValid, setIsStepValid] = useState(false); 

   const {currentUser} = useAuthStore()
    const handleValidationChange = (isValid) => {
        setIsStepValid(isValid);
    };
    useEffect(() => {
        if (open) {
            setActiveStep(0);
            resetFormData();
        }
    }, [open, resetFormData]);

    useEffect(() => {
       
        
        if (formData.cliente.servicio) {
            const { requiere_origen, requiere_destino } = formData.cliente.servicio;
            const newSteps = ['Información del Cliente y Servicio'];
            if (requiere_origen == true) newSteps.push('Dirección de Origen');
            if (requiere_destino == true) newSteps.push('Dirección de Destino');
            newSteps.push('Confirmación');
            setSteps(newSteps);
        } else {
            setSteps(['Información del Cliente y Servicio', 'Confirmación']);
        }
    }, [formData.cliente.servicio]);

    const handleNext = () => {
         (formData);
        if (isStepValid) {
            setActiveStep((prevStep) => prevStep + 1);
            setIsStepValid(false);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa la información del step actual.',
                confirmButtonText: 'Aceptar'
            });
        }
       
      
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
        setIsStepValid(true); 
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        try {
            if (!formData.cliente || !formData.cliente.servicio) {
                throw new Error('Faltan datos del cliente o servicio.');
            }
            const fechaSinZonaHoraria = dayjs(formData.cliente.fechaCreacion).format('YYYY-MM-DD HH:mm:ss');  // Esto asegura el formato ISO con zona horaria
            const requestData = {
                clienteId: currentUser.issCliente,
                servicioId: formData.cliente.servicio.idServicio,
                direccionOrigen: formData.origen,
                direccionDestino: formData.destino,
                fecha: fechaSinZonaHoraria,
                observacion: formData.cliente.observacion || '',
            };
             (requestData);
  
            
            const response = await createSolicitudCliente(requestData);

            if (response.status !== 201) {
                throw new Error('Error al enviar la solicitud');
            }

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Solicitud enviada con éxito',
                showConfirmButton: false,
                timer: 2000
            });

            handleClose(); // Cerrar el diálogo
        } catch (error) {
            // Mostrar mensaje de error con SweetAlert2
             (error);
            
            Swal.fire({
                icon: 'error',
                title: errorr.response.data.error,
                text: error.response.data.message,
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Formulario de Solicitud</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    {activeStep === 0 && <ClienteYServicio handleValidationChange={handleValidationChange} />}
                    {activeStep === 1 && formData.cliente.servicio?.requiere_origen == true && (
                        <DireccionForm tipo="origen" handleValidationChange={handleValidationChange} />
                    )}
                    {activeStep === 2 && formData.cliente.servicio?.requiere_destino == true && (
                        <DireccionForm tipo="destino" handleValidationChange={handleValidationChange} />
                    )}
                    {activeStep === steps.length - 1 && <Confirmacion />}

                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Atrás
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                            sx={{ marginLeft: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                        </Button>
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
