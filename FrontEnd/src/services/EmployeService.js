import axios from "axios";
import { URLBASE } from "../config";

// Crear una instancia de axios con la baseURL configurada
const employeAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/empleados`,
});

// Interceptor para agregar el token a las solicitudes
employeAPI.interceptors.request.use(
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

// Función para obtener empleados
export const getEmployes = async () => {
  try {
    const response = await employeAPI.get("");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

export const availableEmployees = async (fecha) => await employeAPI.post("/available-employees", { fecha });
export const getEmploye = async (id) => {
  try {
    const res = await employeAPI.get(`/${id}`);
     (res);

    return res.data.empleado;
  } catch (error) {
    console.error("Error al obtener empleado:", error);
    throw error;
  }
};


// Función para crear empleado
export const createEmploye = async (data) => {
  try {
    const response = await employeAPI.post("", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    throw error;
  }
};

// Función para actualizar empleado
export const updateEmploye = async (data) => {
  try {
    const response = await employeAPI.put(`/${data.idEmpleado}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    throw error;
  }
};
export const getPuestos = async () =>{


  let state = localStorage.getItem("auth-State");
  state = JSON.parse(state);

  try {
    const result = await axios.get(`${URLBASE}/api/v1/administrador/puestos`, {
      headers: {
        Authorization: `Bearer ${state.state.token}`
      }
    }) 

    return result.data.data
  } catch (error) {
    console.error("Error al cargar los puestos:", error);
    throw error;
  }

  
}
// Función para eliminar empleado
export const deleteEmploye = async (id) => {
  try {
    const response = await employeAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    throw error;
  }
};
