import axios from "axios";
import { URLBASE, TOKEN } from "../config";
// Crear una instancia de axios con la baseURL configurada
const AuthAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/empleado`,
});

// Helper para agregar el token de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem("authState");
  console.log(token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Función para obtener empleados
export const getEmployes = async () => {
  try {
    const response = await AuthAPI.get("", getAuthHeaders());
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

// Función para crear empleado
export const createEmployee = async (data) => {
  try {
    const response = await AuthAPI.post("", data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    throw error;
  }
};

// Función para actualizar empleado
export const updateEmployee = async (data) => {
  try {
    const response = await AuthAPI.put(
      `/${data.idEmpleado}`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    throw error;
  }
};

// Función para eliminar empleado
export const deleteEmployee = async (id) => {
  try {
    const response = await AuthAPI.delete(`/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    throw error;
  }
};
