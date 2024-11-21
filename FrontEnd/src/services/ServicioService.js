import axios from "axios";
import { URLBASE } from "../config";

// Instancias de axios para las rutas específicas
const servicioAPICliente = axios.create({
  baseURL: `${URLBASE}/api/v1/cliente`,
});

const servicioAPIAdmin = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador`,
});

const servicioAPIPublico = axios.create({
  baseURL: `${URLBASE}/api/v1`,
});

// Interceptor para agregar el token a las solicitudes
const agregarToken = (config) => {
  let state = localStorage.getItem("auth-State");
  state = JSON.parse(state);
  if (state && state.state.token) {
    config.headers.Authorization = `Bearer ${state.state.token}`;
  }
  return config;
};

// Agregar interceptores a las instancias
servicioAPICliente.interceptors.request.use(agregarToken, (error) => Promise.reject(error));
servicioAPIAdmin.interceptors.request.use(agregarToken, (error) => Promise.reject(error));

// ** Rutas públicas **

// Función para obtener todos los servicios (público)
export const getAllServices = async () => {
  try {
    const response = await servicioAPIPublico.get("/servicios");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener servicios públicos:", error);
    throw error;
  }
};

// ** Rutas de cliente **

// Función para crear una solicitud (Cliente)
export const createSolicitudCliente = async (data) => {
  try {
    console.log(data);
    
    const response = await servicioAPICliente.post(`/solicitudes/${data.clienteId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear solicitud para cliente:", error);
    throw error;
  }
};

// ** Rutas de administrador **

// Función para obtener los servicios (Administrador)
export const getServicesAdmin = async () => {
  try {
    const response = await servicioAPIAdmin.get("/servicios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios para administrador:", error);
    throw error;
  }
};

// Función para crear un nuevo servicio (Administrador)
export const createServiceAdmin = async (data) => {
  try {
    const response = await servicioAPIAdmin.post("/servicios", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear servicio para administrador:", error);
    throw error;
  }
};

// Función para actualizar un servicio (Administrador)
export const updateServiceAdmin = async (id, data) => {
  try {
    const response = await servicioAPIAdmin.put(`/servicios/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar servicio para administrador:", error);
    throw error;
  }
};

// Función para eliminar un servicio (Administrador)
export const deleteServiceAdmin = async (id) => {
  try {
    const response = await servicioAPIAdmin.delete(`/servicios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar servicio para administrador:", error);
    throw error;
  }
};
