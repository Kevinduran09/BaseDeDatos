import axios from "axios";
import { URLBASE, TOKEN } from "../config";

const ServicioAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/servicio`,
});

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getServices = async () => {
  try {
    const response = await ServicioAPI.get("/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};

export const getService = async (id) => {
  try {
    const response = await ServicioAPI.get(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    throw error;
  }
};

export const createService = async (data) => {
  try {
    const response = await ServicioAPI.post("/", data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    throw error;
  }
};

export const updateService = async (data) => {
  try {
    const response = await ServicioAPI.put(
      `/${data.idServicio}`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await ServicioAPI.delete(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    throw error;
  }
};
