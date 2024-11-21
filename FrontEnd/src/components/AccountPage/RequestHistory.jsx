import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Button, TextField, Grid, Typography } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore'; // Suponiendo que tienes un store de autenticación
import { getRequestsByClientId, cancelRequest } from '../../services/ClientService'; // Suponiendo que tienes un servicio de cliente
import Swal from 'sweetalert2'; // Importar SweetAlert2

export const RequestHistory = () => {
    const { currentUser } = useAuthStore(); // Obtén el cliente logueado
    const [requestHistory, setRequestHistory] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filters, setFilters] = useState({
        date: '',
        serviceType: '',
        status: '',
    });

    useEffect(() => {
        const loadSolicitudes = async () => {
            if (currentUser?.issCliente) {
                const response = await getRequestsByClientId(currentUser.issCliente);
                if (response.success) {
                    setRequestHistory(response.data);
                    setFilteredRequests(response.data);
                }
            }
        };

        loadSolicitudes();
    }, [currentUser]);

    // Maneja los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleFilter = () => {
        const filtered = requestHistory.filter((request) => {
            const matchesDate = filters.date ? request.fecha.includes(filters.date) : true;
            const matchesServiceType = filters.serviceType ? request.serviceType.includes(filters.serviceType) : true;
            const matchesStatus = filters.status ? request.estado.includes(filters.status) : true;
            return matchesDate && matchesServiceType && matchesStatus;
        });
        setFilteredRequests(filtered);
    };

    const handleCancelRequest = (requestId) => {
        cancelRequest(requestId)
            .then((response) => {
                if (response.success) {
                    // Mostrar un mensaje de éxito con SweetAlert
                    Swal.fire({
                        title: 'Éxito',
                        text: 'La solicitud ha sido cancelada exitosamente.',
                        icon: 'success',
                    });
                    // Actualizar los estados de las solicitudes
                    setRequestHistory(requestHistory.filter((request) => request.id !== requestId));
                    setFilteredRequests(filteredRequests.filter((request) => request.id !== requestId));
                } else {
                    
                }
            })
            .catch((error) => {
     
                
                Swal.fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                });
            });
    };

    return (
        <Box>
            <h2>Historial de Solicitudes</h2>

            {/* Filtros */}
            <Box sx={{ marginBottom: 2, display:'flex',alignItems:'center',flexWrap:'wrap',gap:{xs:2,md:0} }}>
                <TextField
                    label="Fecha"
                    variant="outlined"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Tipo de Servicio"
                    variant="outlined"
                    name="serviceType"
                    value={filters.serviceType}
                    onChange={handleFilterChange}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Estado"
                    variant="outlined"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    sx={{ marginRight: 2 }}
                />
                <Button variant="contained" onClick={handleFilter}>Filtrar</Button>
            </Box>

     
            
                {filteredRequests.length == 0 ?
                (<Box>
                    <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 3 }}>
                        ¡No tienes solicitudes de servicio registradas. !
                    </Typography>
                </Box>)
                  
                :
                    (
                    <Grid container spacing={3}>
                        {
                            filteredRequests.map((request) => (
                                <Grid item key={request.idSolicitud} xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardContent>
                                            <h3>{request.service}</h3>
                                            <p><strong>Fecha:</strong> {request.fecha}</p>
                                            <p ><strong >Estado:</strong ><span style={{ color: `${getColor(request.estado)}` }}>  {request.estado}</span> </p>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleCancelRequest(request.idSolicitud)}
                                            >
                                                Cancelar Solicitud
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                        
                    )
            }

        </Box>
    );
};


const getColor = (estado) => {
    switch (estado) {
        case 'En proceso':
            return 'blue';
        case 'Pendiente':
            return '#A88924';
        case 'Completado':
            return 'green';
        case 'Cancelado':
            return 'red';
        default:
            return 'gray';
    }
};
