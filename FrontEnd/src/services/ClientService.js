import axios from "axios";
import { URLBASE, TOKEN } from "../config";
import { useAuthStore } from "../store/useAuthStore";
const clientAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/cliente`,
});

clientAPI.interceptors.request.use(
  (config) => {
    // Obtener el token desde el localStorage
    let state = localStorage.getItem("auth-State");
    state = JSON.parse(state);
     (state.state.token);
    
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
     (res);

    return res.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
};

export const createClient = async (data) => clientAPI.post("", data);

export const updateClient = async (data) => {
  try {
    const res = await clientAPI.put(`/${data.idCliente}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};

export const deleteClient =  (id) => clientAPI.delete(`/${id}`);

const userAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/cliente`,
});

userAPI.interceptors.request.use(
  (config) => {
    // Obtener el token desde el localStorage
    let state = localStorage.getItem("auth-State");
    state = JSON.parse(state);


    if (state) {
      config.headers.Authorization = `Bearer ${state.state.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const updateMyInfo = async (id, data) => {
  try {
    const res = await userAPI.put(`/perfil/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar mi información:", error);
    throw error;
  }
};


export const getMyInfo = async (id) => {
  try {
    const res = await userAPI.get(`/perfil/${id}`);

    
    return res.data;
  } catch (error) {
    console.error("Error al obtener mi información:", error);
    throw error;
  }
};


export const getRequestsByClientId = async (id) => {
  try {
    const res = await userAPI.get(`/solicitudes/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};


export const getInvoicesByClientId = async (id) => {
  try {
    const res = await userAPI.get(`/facturas/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener facturas del cliente:", error);
    throw error;
  }
};

export const getNotificationsByClientId = async (id) => {
  try {
    const res = await userAPI.get(`/notificaciones/${id}`);
     (res.data.data);
    
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener notificaciones del cliente:", error);
    throw error;
  }
};


export const updateNotificationStatus = async ([idNotificacion, iss]) => {
  try {
    const res = await userAPI.put(`/notificaciones/${idNotificacion}/marcar-como-vista/${iss}`);
    return res.data;
  } catch (error) {
    console.error("Error al cambiar estado de la notificación:", error);
    throw error;
  }
};


export const cancelRequest = async (id) => {
  try {
    const res = await userAPI.post(`/solicitudes/cancelar/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar mi información:", error);
    throw error;
  }
};
