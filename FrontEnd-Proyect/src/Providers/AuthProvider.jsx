import React, { Fragment, useState, useEffect, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        // Verificar si el usuario está autenticado (por ejemplo, a través de sessionStorage)
        const current = sessionStorage.getItem('current');
        setIsLogged(current ? true : false);
    }, []);

    return <AuthContext.Provider value={isLogged}>{children}</AuthContext.Provider>;
};