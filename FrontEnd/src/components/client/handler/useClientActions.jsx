import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createClient,
  deleteClient,
  updateClient,
  getClient,
} from "../../../services/ClientService";
import { SuccessDialogo, ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useState } from "react";

export const useClientActions = () => {
  const queryClient = useQueryClient();
  const [cliente, setCliente] = useState({});

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries("clientes");
      SuccessDialogo("Eliminado", "Cliente", "eliminado");
    },
    onError: (error) => {
      console.error('error al eliminar el cliente',error);
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

  const deleteCliente = (id) => {
    ConfirmarDialogo(deleteMutation, id, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const createCliente = (data) => {
    ConfirmarDialogo(createMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const updateCliente = (data) => {
    ConfirmarDialogo(updateMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const fetchCliente = async (id) => {
    const cliente = await getClient(id);
    setCliente(cliente); // Almacena el cliente en el estado
    return cliente;
  };

  return {
    createCliente,
    updateCliente,
    deleteCliente,
    fetchCliente,
  };
};
