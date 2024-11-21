import axios from 'axios';
import { URLBASE, TOKEN } from "../config";
const auditAPI = axios.create({
    baseURL: `${URLBASE}/api/v1/administrador/auditorias`,
});


auditAPI.interceptors.request.use(
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

// Obtener auditorías de usuario
export const getAuditoriasUsuario = async () => {
    try {
        const response = await auditAPI.get('/usuario');
        return response.data.data; 
    } catch (error) {
        console.error('Error al obtener auditorías de usuario', error);
        throw error;
    }
};

// Obtener auditorías de solicitud
export const getAuditoriasSolicitud = async () => {
    try {
        const response = await auditAPI.get('/solicitud');
        return response.data.data; 
    } catch (error) {
        console.error('Error al obtener auditorías de solicitud', error);
        throw error;
    }
};