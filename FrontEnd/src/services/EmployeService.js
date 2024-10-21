import axios from "axios";
import { URLBASE } from "../config";

// Crear una instancia de axios con la baseURL configurada
const employeeAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/empleado`,
});

// Interceptor para agregar el token a las solicitudes
employeeAPI.interceptors.request.use(
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

// Función para obtener empleados
export const getEmployees = async () => {
  try {
    const response = await employeeAPI.get("");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

// Función para crear empleado
export const createEmployee = async (data) => {
  try {
    const response = await employeeAPI.post("", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    throw error;
  }
};

// Función para actualizar empleado
export const updateEmployee = async (data) => {
  try {
    const response = await employeeAPI.put(`/${data.idEmpleado}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    throw error;
  }
};

// Función para eliminar empleado
export const deleteEmployee = async (id) => {
  try {
    const response = await employeeAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    throw error;
  }
};
