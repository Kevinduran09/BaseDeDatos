import axios from "axios";
import { URLBASE } from "../config";

// Crear una instancia de axios con la baseURL configurada
const solicitudAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/solicitud`,
});

// Interceptor para agregar el token a todas las solicitudes
solicitudAPI.interceptors.request.use(
  (config) => {
    // Obtener el token desde el localStorage
    let state = localStorage.getItem("authState");
    state = JSON.parse(state);
    if (state && state.state.token) {
      config.headers.Authorization = `Bearer ${state.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Obtener todas las solicitudes
export const getSolicitudes = async () => {
  try {
    const res = await solicitudAPI.get("");
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return error.response;
  }
};

// Obtener una solicitud por ID
export const getSolicitud = async (id) => {
  try {
    const res = await solicitudAPI.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    throw error;
  }
};

// Crear una solicitud
export const createSolicitud = async (data) => {
  try {
    const res = await solicitudAPI.post("", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return error.response;
  }
};

// Actualizar una solicitud
export const updateSolicitud = async (data) => {
  try {
    const res = await solicitudAPI.put(`/${data.idSolicitud}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    throw error;
  }
};

// Eliminar una solicitud
export const deleteSolicitud = async (id) => {
  try {
    const res = await solicitudAPI.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return error.response;
  }
};
