import axios from "axios";
import { URLBASE } from "../config";

// Crear instancia de axios con la baseURL
const vehiculoAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/vehiculos`,
});

// Interceptor para agregar el token a las solicitudes
vehiculoAPI.interceptors.request.use(
  (config) => {
    // Obtener el token desde el localStorage
    let state = localStorage.getItem("auth-State");
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

// Obtener todos los vehículos
export const getVehicles = async () => {
  try {
    const response = await vehiculoAPI.get("");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
};


export const getVehicle = async (id) => {
  try {
    const res = await vehiculoAPI.get(`/${id}`);
    

    return res.data.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
};


// Crear un vehículo
export const createVehicle = async (data) => {
  try {
    const response = await vehiculoAPI.post("", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    throw error;
  }
};

// Actualizar un vehículo
export const updateVehicle = async (data) => {
  try {
    const response = await vehiculoAPI.put(`/${data.idVehiculo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    throw error;
  }
};

// Eliminar un vehículo
export const deleteVehicle = async (id) => {
  try {
    const response = await vehiculoAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    throw error;
  }
};
