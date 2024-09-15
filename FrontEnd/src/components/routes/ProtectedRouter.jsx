import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Navigate } from "react-router-dom";
export const ProtectedRouter = ({ children, role }) => {
  const { isAuthenticated, currentUser } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  //   if (role && currentUser.role !== role) return <Navigate to={"/"} />;
  return children;
};
