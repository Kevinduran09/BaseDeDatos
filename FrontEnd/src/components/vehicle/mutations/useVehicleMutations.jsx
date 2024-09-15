import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createVehicle,
  deleteVehicle,
  updateVehicle,
} from "../../../services/VehicleService";
import { SuccessDialogo } from "../../dialogos/Dialogos";

export const useVehicleMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      SuccessDialogo("Creado", "Vehículo", "creado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      SuccessDialogo("Eliminado", "Vehículo", "eliminado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      SuccessDialogo("Actualizado", "Vehículo", "actualizado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};
