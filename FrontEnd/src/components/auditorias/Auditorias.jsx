import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { AuditoriaUsuario } from './AuditoriaUsuario';  // Componente para auditoría de usuario
import { AuditoriaSolicitud } from './AuditoriaSolicitud';  // Componente para auditoría de solicitud

export const Auditorias = () => {
    const [tabIndex, setTabIndex] = useState(0); // Controlador de las pestañas

    // Función para manejar el cambio de pestaña
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <div>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="auditorías tabs">
                    <Tab label="Auditorías de Usuario" />
                    <Tab label="Auditorías de Solicitud" />
                </Tabs>

                <TabPanel value={tabIndex} index={0}>
                    <AuditoriaUsuario />
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <AuditoriaSolicitud />
                </TabPanel>
            </Box>
        </div>
    );
};

// Componente auxiliar para renderizar el contenido de las pestañas
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
