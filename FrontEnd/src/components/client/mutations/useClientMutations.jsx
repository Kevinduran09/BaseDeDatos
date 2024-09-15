import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createClient,
  deleteClient,
  updateClient,
} from "../../../services/ClientService";
import { SuccessDialogo } from "../../dialogos/Dialogos";
export const useClientMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries("clientes");
      SuccessDialogo("Eliminado", "Cliente", "eliminado");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries("clientes");
      SuccessDialogo("Creado", "Cliente", "creado");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries("clientes");
      SuccessDialogo("Actualizado", "Cliente", "Actualizado");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { deleteMutation, createMutation, updateMutation };
};
