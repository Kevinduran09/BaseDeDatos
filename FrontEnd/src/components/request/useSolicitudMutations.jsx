import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createSolicitud,
  deleteSolicitud,
  updateSolicitud,
} from "../../services/SolicitudService";
import { SuccessDialogo } from "../dialogos/Dialogos";

export const useSolicitudMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSolicitud,
    onSuccess: () => {
      queryClient.invalidateQueries("solicitudes");
      SuccessDialogo("Creada", "Solicitud", "creada");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSolicitud,
    onSuccess: () => {
      queryClient.invalidateQueries("solicitudes");
      SuccessDialogo("Eliminada", "Solicitud", "eliminada");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSolicitud,
    onSuccess: () => {
      queryClient.invalidateQueries("solicitudes");
      SuccessDialogo("Actualizada", "Solicitud", "Actualizada");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};
