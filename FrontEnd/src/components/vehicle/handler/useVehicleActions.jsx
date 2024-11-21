import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicle,
} from "../../../services/VehicleService";
import { SuccessDialogo, ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useState } from "react";

export const useVehicleActions = () => {
  const queryClient = useQueryClient();
  const [vehiculo, setVehiculo] = useState({});

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries("vehiculos");
      SuccessDialogo("Eliminado", "Vehículo", "eliminado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries("vehiculos");
      SuccessDialogo("Creado", "Vehículo", "creado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries("vehiculos");
      SuccessDialogo("Actualizado", "Vehículo", "actualizado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteVehiculo = (id) => {
    ConfirmarDialogo(deleteMutation, id, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const createVehiculo = (data) => {
    ConfirmarDialogo(createMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const updateVehiculo = (data) => {
    ConfirmarDialogo(updateMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const fetchVehiculo = async (id) => {
    const vehiculo = await getVehicle(id);
    setVehiculo(vehiculo); // Almacena el vehículo en el estado
    return vehiculo;
  };

  return {
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    fetchVehiculo,
  };
};
