import React, { useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { availableEmployees } from '../../services/EmployeService'; // Asegúrate de tener esta función
import Swal from 'sweetalert2';
import { useViajeStore } from '../../store/useViajeStore';
import { Loading } from '../../utils/loading';

export const StepAssignEmployees = ({ onValidation }) => {
  const { vehicle, fechaViaje, employeeIds, toggleEmployeeSelection } = useViajeStore();
  const [empleados, setEmpleados] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (employeeIds.length > 0) {
      // Aquí puedes agregar lógica si es necesario
    }
  }, [employeeIds]);

  const handleConsultarEmpleados = async () => {
    setLoading(true);
    try {
      const response = await availableEmployees(fechaViaje);
       (response);

      if (response.data && response.data.data) {
        setEmpleados(response.data.data);
      }
    } catch (error) {
      console.error("Error al consultar empleados:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los empleados.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEmpleado = (empleado) => {
    if (!employeeIds.includes(empleado.idEmpleado)) {
      if (employeeIds.length < vehicle.capacidad) {
        toggleEmployeeSelection(empleado.idEmpleado, true);
      } else {
        Swal.fire({
          title: 'Capacidad máxima alcanzada',
          text: 'No se pueden seleccionar más empleados que la capacidad del vehículo.',
          icon: 'warning',
        });
      }
    } else {
      Swal.fire({
        title: 'Empleado ya seleccionado',
        text: 'Este empleado ya está asignado al viaje.',
        icon: 'warning',
      });
    }
  };

  const handleDeselectEmpleado = (empleadoId) => {
    toggleEmployeeSelection(empleadoId, false);
  };

  const validarSeleccion = () => {
    const tieneChofer = empleados.some(emp => emp.idEmpleado && employeeIds.includes(emp.idEmpleado) && emp.cargo === 'Chofer');
    const tieneCustodio = empleados.some(emp => emp.idEmpleado && employeeIds.includes(emp.idEmpleado) && emp.cargo === 'Custodio');

    if (tieneChofer && tieneCustodio) {
      Swal.fire({
        title: 'Selección Completa',
        text: 'Los empleados requeridos han sido seleccionados.',
        icon: 'success',
      });
      onValidation(true);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar al menos un Chofer y un Custodio.',
        icon: 'error',
      });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Seleccione los empleados para el viaje</Typography>
      <Button variant="contained" onClick={handleConsultarEmpleados} disabled={loading}>
        Consultar Empleados
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <FormControl fullWidth margin="normal">
          <InputLabel id="empleado-select-label">Empleados</InputLabel>
          <Select
            labelId="empleado-select-label"
            multiple
            value={empleados.filter(emp => employeeIds.includes(emp.idEmpleado))}
            onChange={(e) => {
              const selectedEmployees = e.target.value;

              // Llamar a handleSelectEmpleado para manejar la selección de cada empleado
              selectedEmployees.forEach(emp => handleSelectEmpleado(emp));
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.idEmpleado} label={`${value.nombre} (${value.cargo})`} />
                ))}
              </Box>
            )}
            label="Empleados"
          >
            {empleados.map((empleado) => (
              <MenuItem key={empleado.idEmpleado} value={empleado}>
                {`${empleado.nombre} - ${empleado.cargo}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Empleados Seleccionados</Typography>
          {empleados
            .filter((empleado) => employeeIds.includes(empleado.idEmpleado))
            .map((empleado) => (
              <Typography key={empleado.idEmpleado}>
                {`${empleado.nombre} - ${empleado.cargo}`}
                <Button onClick={() => handleDeselectEmpleado(empleado.idEmpleado)} size="small">Eliminar</Button>
              </Typography>
            ))}
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={validarSeleccion}
        sx={{ mt: 2 }}
      >
        Validar Selección
      </Button>
    </Box>
  );
};
