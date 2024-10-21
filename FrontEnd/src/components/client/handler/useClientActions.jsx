import { getClient } from "../../../services/ClientService";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useClientMutations } from "../mutations/useClientMutations";
import { useNavigate } from "react-router-dom";
export const useClientActions = () => {
  const navegate = useNavigate();
  const { createMutation, updateMutation, deleteMutation } =
    useClientMutations();

  const createCliente = (client) => {
    ConfirmarDialogo(createMutation, client);
  };
  const deleteCliente = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };
  const updateCliente = (client) => {
    ConfirmarDialogo(updateMutation, client);
  };
  const hanleClientDetail = (id) => {
    navegate(`/app/clients/${id}`);
  };
  const getClientById = (id) => {
    return getClient(id).then((data) => {
      console.log(data);
      return data;
    });
  };
  return {
    getClientById,
    createCliente,
    deleteCliente,
    updateCliente,
    hanleClientDetail,
  };
};
