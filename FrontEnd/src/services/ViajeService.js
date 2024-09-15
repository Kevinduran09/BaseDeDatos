import axios from "axios";
import { URLBASE, TOKEN } from "../config";
const ViajeAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/viaje`,
});

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getViajes = async () => {
  try {
    const response = await ViajeAPI.get("/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    throw error;
  }
};

export const getViaje = async (id) => {
  try {
    const response = await ViajeAPI.get(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    throw error;
  }
};

export const createViaje = async (data) => {
  try {
    const response = await ViajeAPI.post("/", data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al crear viaje:", error);
    throw error;
  }
};

export const deleteViaje = async (id) => {
  try {
    const response = await ViajeAPI.delete(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    throw error;
  }
};

export const getViajeByFecha = async (fecha) => {
  try {
    const response = await ViajeAPI.post("/fecha", { fecha }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje por fecha:", error);
    throw error;
  }
};

export const getViajesByChofer = async (id) => {
  try {
    const response = await ViajeAPI.get(`/empleado/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener viajes por chofer:", error);
    throw error;
  }
};
