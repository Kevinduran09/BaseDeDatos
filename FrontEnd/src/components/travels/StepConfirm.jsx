import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useViajeStore } from '../../store/useViajeStore';
import Swal from 'sweetalert2';
import { createViaje } from '../../services/ViajeService'; // Función para enviar los datos al backend

export const StepConfirm = () => {
  const { selectedRequests, vehicleId,vehicle, employeeIds, fechaViaje } = useViajeStore();

  const handleConfirm = async () => {
    const tripData = {
      selectedRequests,
      vehicleId: vehicleId,
      employeeIds,
      fechaViaje,
    };

    try {
      const response = await createViaje(tripData);

      if (response) {
        Swal.fire({
          title: 'Confirmación Exitosa',
          text: 'El viaje ha sido confirmado y los datos enviados correctamente.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al confirmar el viaje. Inténtalo nuevamente.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar los datos. Inténtalo nuevamente.',
        icon: 'error',
      });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Resumen de la Confirmación</Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Solicitudes Asignadas</Typography>
          <Typography>{selectedRequests.length} solicitud{selectedRequests.length > 1 ? 'es' : ''}</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Vehículo</Typography>
          <Typography>{vehicle.modelo} ({vehicle.color})</Typography>
          <Typography>{vehicle.capacidad} Personas</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Empleados Asignados</Typography>
          <Typography>{employeeIds.length} empleado{employeeIds.length > 1 ? 's' : ''}</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Fecha de Viaje</Typography>
          <Typography>{fechaViaje}</Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        sx={{ mt: 2 }}
      >
        Confirmar Viaje
      </Button>
    </Box>
  );
};
