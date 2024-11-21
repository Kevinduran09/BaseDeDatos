import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getNotificationsByClientId, updateNotificationStatus } from '../../services/ClientService'; 
import { useAuthStore } from '../../store/useAuthStore';
import { Loading } from '../../utils/loading';

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const {currentUser} = useAuthStore();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notificaciones', currentUser?.issCliente], 
        queryFn: () => getNotificationsByClientId(currentUser?.issCliente), 
        enabled: !!currentUser?.issCliente, 
        onSuccess: (data) => setNotifications(data),
    });

    const markAsReadMutation = useMutation({
        mutationFn: updateNotificationStatus, 
        onSuccess: (updatedNotification) => {
            queryClient.invalidateQueries("notificaciones")

        },
        onError: (error) => {
            console.error("Error al marcar la notificación como leída:", error);
        },
    });

    const handleNotificationClick = (notification) => {
        if (notification.leido == 0) {
        
            markAsReadMutation.mutate([notification.idNotificacion, currentUser?.issCliente]); 
        }
    };

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return <Typography variant="body1" color="error" align="center">Error al cargar las notificaciones.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Mis Notificaciones
            </Typography>

            {/* Verificar si hay notificaciones y mostrar mensaje si está vacío */}
            {data.length === 0 ? (
                <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 3 }}>
                    No tienes notificaciones registradas.
                </Typography>
            ) : (
                <Box sx={{ display: 'grid', gap: 2 }}>
                        {data.map((notification) => (
                        <Card
                            key={notification.idNotificacion}
                            sx={{
                                display: 'flex',
                                borderLeft: `6px solid ${notification.leido == 0 ? '#FF7043' : '#B0BEC5'}`, // Color llamativo si no leída, gris si leída
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: notification.leido == 0 ? '#FFF3E0' : '#ECEFF1', // Fondo suave
                                '&:hover': {
                                    boxShadow: 6, // Efecto hover
                                    cursor: 'pointer', // Indica que la tarjeta es clickeable
                                },
                            }}
                            onClick={() => handleNotificationClick(notification)} // Manejar el clic
                        >
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {notification.mensaje}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                    {notification.fechaNotificacion}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};
