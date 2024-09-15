import { useNavigate } from "react-router-dom";
import { useSolicitudMutations } from "./useSolicitudMutations";

export const useSolicitudActions = () => {
  const navegate = useNavigate();
  const { createMutation, updateMutation, deleteMutation } =
    useSolicitudMutations();

  const createSolicitud = (solicitud) => {
    ConfirmarDialogo(createMutation, solicitud);
  };

  const updateSolicitud = (solicitud) => {
    ConfirmarDialogo(updateMutation, solicitud);
  };

  const deleteSolicitud = (idSolicitud) => {
    ConfirmarDialogo(deleteMutation, idSolicitud);
  };

  const handleSolicitudDetail = (idSolicitud) => {
    navegate(`/app/solicitudes/${idSolicitud}`);
  };

  return {
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    handleSolicitudDetail,
  };
};
