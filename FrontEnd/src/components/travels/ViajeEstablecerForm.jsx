import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import {StepSelectRequests} from './StepSelectRequests'; 
import {StepAssignVehicle} from './StepAssignVehicle';   
import {StepAssignEmployees} from './StepAssignEmployees';
import {StepConfirm} from './StepConfirm';              
import { useViajeStore } from '../../store/useViajeStore';
const steps = [
    'Consultar y seleccionar solicitudes',
    'Asignar vehículo',
    'Asignar empleados',
    'Confirmar'
];

export const ViajeEstablecerForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isValidStep, setIsValidStep] = useState(false);  
    const { resetStore } =useViajeStore();

    useEffect(() => {
      
        resetStore();
    }, [resetStore]);


    const handleNext = () => {
        if (isValidStep) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleValidateStep = (valid) => {
        setIsValidStep(valid);  // Se actualiza la validez del paso actual
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <StepSelectRequests onValidation={handleValidateStep} />;
            case 1:
                return <StepAssignVehicle onValidation={handleValidateStep} />;
            case 2:
                return <StepAssignEmployees onValidation={handleValidateStep} />;
            case 3:
                return <StepConfirm />;
            default:
                return <Typography>Error</Typography>;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ padding: 2 }}>
                {activeStep === steps.length ? (
                    <Typography>Viaje Establecido Exitosamente!</Typography>
                ) : (
                    <>
                        <Typography mt={2} sx={{ textAlign: 'center' }} variant="h6">{steps[activeStep]}</Typography>
                        {renderStepContent(activeStep)} {/* Renderiza el contenido del paso */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Regresar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={!isValidStep}  // Deshabilitar el botón hasta que el paso sea válido
                            >
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};
