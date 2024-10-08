import axios from "axios";
import { URLBASE, TOKEN } from "../config";

const solicitudAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/solicitud`,
});

// Obtener todas las solicitudes
export const getSolicitudes = async () => {
  try {
    const res = await solicitudAPI.get("", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener una solicitud por ID
export const getSolicitud = async (id) => {
  try {
    const res = await solicitudAPI.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    throw error;
  }
};

// Crear una solicitud
export const createSolicitud = async (data) => {
  try {
    const res = await solicitudAPI.post("", data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return error.response;
  }
};

// Actualizar una solicitud
export const updateSolicitud = async (data) => {
  try {
    const res = await solicitudAPI.put(`/${data.idSolicitud}`, data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    throw error;
  }
};

// Eliminar una solicitud
export const deleteSolicitud = async (id) => {
  try {
    const res = await solicitudAPI.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return error.response;
  }
};
