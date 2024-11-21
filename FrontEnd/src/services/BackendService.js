import axios from "axios";
import { URLBASE } from "../config";

// Crear una instancia de axios para el servicio de base de datos
const databaseAPI = axios.create({
    baseURL: `${URLBASE}/api/v1/administrador/database`, // Ruta de la API para manejar la base de datos
});

databaseAPI.interceptors.request.use(
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

// Realizar un backup de la base de datos
export const backupDatabase = async (backupPath) => {
    try {
        const res = await databaseAPI.post("/backup", { rutaBackup: backupPath });
        return res.data;
    } catch (error) {
        console.error("Error al hacer el backup de la base de datos:", error);
        throw error;
    }
};
