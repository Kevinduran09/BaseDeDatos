import axios from "axios";
import { URLBASE } from "../config";

// Crear instancia de axios con la baseURL
const viajeAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/viaje`,
});

// Interceptor para agregar el token a las solicitudes
viajeAPI.interceptors.request.use(
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

// Obtener todos los viajes
export const getViajes = async () => {
  try {
    const response = await viajeAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    throw error;
  }
};

// Obtener un viaje por ID
export const getViaje = async (id) => {
  try {
    const response = await viajeAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    throw error;
  }
};

// Crear un viaje
export const createViaje = async (data) => {
  try {
    const response = await viajeAPI.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear viaje:", error);
    throw error;
  }
};

// Eliminar un viaje
export const deleteViaje = async (id) => {
  try {
    const response = await viajeAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    throw error;
  }
};

// Obtener viaje por fecha
export const getViajeByFecha = async (fecha) => {
  try {
    const response = await viajeAPI.post("/fecha", { fecha });
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje por fecha:", error);
    throw error;
  }
};

// Obtener viajes por chofer
export const getViajesByChofer = async (id) => {
  try {
    const response = await viajeAPI.get(`/empleado/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener viajes por chofer:", error);
    throw error;
  }
};
