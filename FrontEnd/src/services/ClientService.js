import axios from "axios";
import { URLBASE, TOKEN } from "../config";

const clientAPI = axios.create({
  baseURL: `${URLBASE}/api/v1/administrador/cliente`,
});

// Obtener todos los clientes
export const getClients = async () => {
  try {
    const res = await clientAPI.get("", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener un cliente por ID
export const getClient = async (id) => {
  try {
    const res = await clientAPI.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
};

// Crear un cliente
export const createClient = async (data) => {
  try {
    const res = await clientAPI.post("", data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return error.response;
  }
};

// Actualizar un cliente
export const updateClient = async (data) => {
  try {
    const res = await clientAPI.put(`/${data.idCliente}`, data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClient = async (id) => {
  try {
    const res = await clientAPI.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return error.response;
  }
};
