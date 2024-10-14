import axios from "axios";
import { URLBASE } from "../config";

// Crear una instancia de axios con la baseURL configurada
const servicioAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/servicio`,
});

// Interceptor para agregar el token a las solicitudes
servicioAPI.interceptors.request.use(
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

// Función para obtener todos los servicios
export const getServices = async () => {
  try {
    const response = await servicioAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};

// Función para obtener un servicio por ID
export const getService = async (id) => {
  try {
    const response = await servicioAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    throw error;
  }
};

// Función para crear un nuevo servicio
export const createService = async (data) => {
  try {
    const response = await servicioAPI.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    throw error;
  }
};

// Función para actualizar un servicio
export const updateService = async (data) => {
  try {
    const response = await servicioAPI.put(`/${data.idServicio}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    throw error;
  }
};

// Función para eliminar un servicio
export const deleteService = async (id) => {
  try {
    const response = await servicioAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    throw error;
  }
};
