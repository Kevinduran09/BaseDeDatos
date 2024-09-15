import axios from "axios";
import { URLBASE, TOKEN } from "../config";
const VehiculoAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/vehiculo`,
});

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getVehicles = async () => {
  try {
    const response = await VehiculoAPI.get("", getAuthHeaders());
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
};

export const createVehicle = async (data) => {
  try {
    const response = await VehiculoAPI.post("", data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    throw error;
  }
};

export const updateVehicle = async (data) => {
  try {
    const response = await VehiculoAPI.put(
      `/${data.idVehiculo}`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await VehiculoAPI.delete(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    throw error;
  }
};
