import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getVehicles } from '../../services/VehicleService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useViajeStore } from '../../store/useViajeStore';
import { Loading } from '../../utils/loading';

export const StepAssignVehicle = ({ onValidation }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [vehiculoDetalle, setVehiculoDetalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { vehicleId, setVehicleId } = useViajeStore();

  useEffect(() => {
    if (vehicleId && vehiculos.length > 0) {
      const vehiculoPreseleccionado = vehiculos.find(v => v.idVehiculo === vehicleId);
      if (vehiculoPreseleccionado) {
        setVehiculoSeleccionado(vehiculoPreseleccionado);
        setVehiculoDetalle(vehiculoPreseleccionado);
      }
    }
  }, [vehiculos, vehicleId]);

  const handleConsultarVehiculos = async () => {
    setLoading(true);
    setVehiculoDetalle(null);
    try {
      const response = await getVehicles();
      setVehiculos(response);
    } catch (error) {
      console.error("Error al consultar vehículos:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los vehículos.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setVehiculoDetalle(vehiculo);
  };

  const handleSeleccionarVehiculo = () => {
    if (vehiculoDetalle) {
      setVehicleId(vehiculoDetalle.idVehiculo, vehiculoSeleccionado);
      Swal.fire({
        title: 'Vehículo Seleccionado',
        text: 'El vehículo ha sido seleccionado correctamente.',
        icon: 'success',
      });
      onValidation(true);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un vehículo para continuar.',
        icon: 'error',
      });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Seleccione un vehículo para el viaje</Typography>
      <Button variant="contained" onClick={handleConsultarVehiculos} disabled={loading}>
        Consultar Vehículos
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <FormControl fullWidth margin="normal">
          <InputLabel id="vehiculo-select-label">Vehículos</InputLabel>
          <Select
            labelId="vehiculo-select-label"
            value={vehiculoSeleccionado || ''}
            onChange={(e) => handleSelectVehiculo(e.target.value)}
            label="Vehículos"
          >
            {vehiculos.map((vehiculo) => (
              <MenuItem key={vehiculo.id} value={vehiculo}>
                {`${vehiculo.tipoVehiculo} - ${vehiculo.placa}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {vehiculoDetalle && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Detalles del Vehículo</Typography>
            <Typography>Tipo: {vehiculoDetalle.tipoVehiculo}</Typography>
            <Typography>Placa: {vehiculoDetalle.placa}</Typography>
            <Typography>Capacidad: {vehiculoDetalle.capacidad}</Typography>
            <Typography>Modelo: {vehiculoDetalle.modelo}</Typography>
        
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color={vehiculoDetalle.idVehiculo === vehicleId ? 'success' : 'primary'}
              onClick={handleSeleccionarVehiculo}
              disabled={vehiculoDetalle.idVehiculo === vehicleId}
            >
              {vehiculoDetalle.idVehiculo === vehicleId ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};
