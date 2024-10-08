import axios from "axios";

const AuthAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const loginSession = async (data) => {
  return await AuthAPI.post("/login", data);
};
export const current = async () => {
  return await AuthAPI.options("/current", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Agrega el token al encabezado Authorization
    },
  });
};

export const registerClient = async (data) => {
  return await AuthAPI.post("/cliente/register", data);
};
