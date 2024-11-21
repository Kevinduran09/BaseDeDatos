import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"; 


export const RoleBasedRoute = ({ element, allowedRoles }) => {
    const { currentUser,isAuthenticated } = useAuthStore(); 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(currentUser.cargo)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
};