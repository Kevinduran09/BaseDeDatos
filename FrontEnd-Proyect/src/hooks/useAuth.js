import { useAuthStore } from "../store/useAuthStore";
import { show_alert } from "../utils/functions";
export const login = (token) => {
  const { setToken, setIsAuth, setCurrentUser } = useAuthStore();
  setToken(token);
  setIsAuth();
  setCurrentUser();
};
export const logout = () => {
  useAuthStore.getState().clear();
  show_alert({ title: "Sesión Cerrada!", icon: "success" });
};
