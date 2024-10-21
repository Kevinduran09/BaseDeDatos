const token = localStorage.getItem("authState");
export const TOKEN = JSON.parse(token)?.state?.token;
export const URLBASE = import.meta.env.VITE_api_url || "localhost:8000";
