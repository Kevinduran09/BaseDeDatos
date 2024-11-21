import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { getInvoicesByClientId } from '../../services/ClientService'; // Función de servicio previamente definida
import { useAuthStore } from '../../store/useAuthStore';

export const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const currentUser = useAuthStore((state) => state.currentUser);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                if (currentUser && currentUser.iss) {
                    const response = await getInvoicesByClientId(currentUser.issCliente);
                    setInvoices(response.data);
                }
            } catch (error) {
                console.error('Error al obtener las facturas:', error);
            }
        };

        fetchInvoices(); // Cargar facturas al montar el componente
    }, [currentUser]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Mis Facturas
            </Typography>

            {/* Verificar si hay facturas y mostrar mensaje si está vacío */}
            {invoices.length === 0 ? (
                <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 3 }}>
                    ¡No tienes facturas registradas. !
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {invoices.map((invoice) => (
                        <Grid item xs={12} sm={6} md={4} key={invoice.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        Factura #{invoice.idFactura}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Fecha: {invoice.fechaEmision}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        Monto: ${invoice.recioTotal}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => alert('Descargando factura')}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Descargar
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};
