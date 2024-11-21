import axios from "axios";
import { URLBASE } from "../config";

// Crear instancia de axios con la baseURL
const viajeAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/viaje`, 
});

// Interceptor para agregar el token a las solicitudes
viajeAPI.interceptors.request.use(
  (config) => {
 
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

// Obtener todos los viajes - Admin
export const getViajes = async () => {
  try {
    const response = await viajeAPI.get("");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    throw error;
  }
};

// Obtener un viaje por ID - Admin
export const getViaje = async (id) => {
  try {
    const response = await viajeAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    throw error;
  }
};

// Crear un viaje - Admin
export const createViaje = async (data) => {
  try {
    const response = await viajeAPI.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear viaje:", error);
    throw error;
  }
};

// Eliminar un viaje - Admin
export const deleteViaje = async (id) => {
  try {
    const response = await viajeAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    throw error;
  }
};

// Obtener viaje por fecha - Admin
export const getViajeByFecha = async (fecha) => {
  try {
    const response = await viajeAPI.post("/fecha", { fecha });
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje por fecha:", error);
    throw error;
  }
};
export const getViajeDetalle = async (id) => {
  try {
 
    let state = localStorage.getItem("auth-State");
    state = JSON.parse(state);

    if (state && state.state.token) {
   
      const response = await axios.get(`${URLBASE}/api/v1/viaje/detalle/${id}`, {
        headers: {
          Authorization: `Bearer ${state.state.token}`,
        },
      });

      return response.data; 
    } else {
      throw new Error("Token de autenticación no disponible");
    }
  } catch (error) {
    console.error("Error al obtener viaje por ID:", error);
    throw error;
  }
};


// Rutas específicas para Choferes
const choferAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/chofer`,
});


choferAPI.interceptors.request.use(
  (config) => {
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


export const getViajesByChofer = async (id) => {
  try {
    const response = await choferAPI.get(`/viajes/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener viajes por chofer:", error);
    throw error;
  }
};
export const getViajeChofer = async (id) => {
  try {
    const response = await choferAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    throw error;
  }
};
export const getSolocitudDetalle = async (id) => {
  try {
    const response = await choferAPI.get(`/solicitud-detalle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    throw error;
  }
};

export const actualizarEstadoViaje = async (idViaje, nuevoEstado) => {
  try {
    const response = await choferAPI.put(`/viaje/${idViaje}/actualizarEstado`, { estado: nuevoEstado });
    return response; 
  } catch (error) {
    console.error("Error al actualizar el estado del viaje:", error);
    throw error;
  }
};
export const actualizarEstadoSolicitud = async ( idSolicitud, data) => {
  try {
    const response = await choferAPI.put(`/solicitud-detalle/${idSolicitud}/actualizar`, data);
    return response; 
  } catch (error) {
    console.error("Error al actualizar el estado del viaje:", error);
    throw error;
  }
};
