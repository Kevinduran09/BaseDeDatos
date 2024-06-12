// AuthContext.js
import React, { createContext, useState,useEffect,useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Cargar el estado de autenticación desde sessionStorage
        const storedAuth = sessionStorage.getItem('current');
        setIsAuthenticated(!!storedAuth); // Convertir a booleano
    }, []);
    const login = (userData) => {
        setIsAuthenticated(true);
        console.log(userData);
        sessionStorage.setItem('current', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('current');
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};