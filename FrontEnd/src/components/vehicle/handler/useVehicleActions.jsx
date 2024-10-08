import { useVehicleMutations } from "../mutations/useVehicleMutations";
import { useNavigate } from "react-router-dom";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";

export const useVehicleActions = () => {
  const navegate = useNavigate();
  const { createMutation, updateMutation, deleteMutation } =
    useVehicleMutations();

  const createVehicle = (vehicle) => {
    ConfirmarDialogo(createMutation, vehicle);
  };

  const deleteVehicle = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };

  const updateVehicle = (vehicle) => {
    ConfirmarDialogo(updateMutation, vehicle);
  };

  const handleVehicleDetail = (id) => {
    navegate(`/app/vehicles/${id}`);
  };

  return {
    createVehicle,
    deleteVehicle,
    updateVehicle,
    handleVehicleDetail,
  };
};
