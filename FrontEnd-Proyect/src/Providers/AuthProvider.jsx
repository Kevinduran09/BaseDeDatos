import React, { createContext, useState, useEffect, useContext } from 'react';
import { show_alert } from "../functions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Cargar el estado de autenticación desde sessionStorage
        const storedAuth = JSON.parse(sessionStorage.getItem('current'));
        if (!!storedAuth){
          
           setUserRole(storedAuth.cargo || '');
           setIsAuthenticated(!!storedAuth); 
       }
        
     
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUserRole(userData.cargo);
        console.log(userData);
        sessionStorage.setItem('current', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('');
        sessionStorage.removeItem('current');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userRole');
        show_alert({ title: 'Sesión Cerrada!', icon: 'success' });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
