import axios from "axios";
import { URLBASE, TOKEN } from "../config";
import { useAuthStore } from "../store/useAuthStore";
const clientAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/cliente`,
});

clientAPI.interceptors.request.use(
  (config) => {
    // Obtener el token desde el localStorage
    let state = localStorage.getItem("authState");
    state = JSON.parse(state);
    if (state) {
      state;
      config.headers.Authorization = `Bearer ${state.state.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Obtener todos los clientes
export const getClients = async () => {
  try {
    const res = await clientAPI.get("");
    return res.data.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener un cliente por ID
export const getClient = async (id) => {
  try {
    const res = await clientAPI.get(`/${id}`);
    console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
};

// Crear un cliente
export const createClient = async (data) => {
  try {
    const res = await clientAPI.post("", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return error.response;
  }
};

// Actualizar un cliente
export const updateClient = async (data) => {
  try {
    const res = await clientAPI.put(`/${data.idCliente}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClient = async (id) => {
  try {
    const res = await clientAPI.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return error.response;
  }
};
