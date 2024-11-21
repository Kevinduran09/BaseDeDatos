import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button, Box, Tab, Tabs, Fade } from '@mui/material';
import { RequestHistory } from '../components/AccountPage/RequestHistory';
import { AccountInfo } from '../components/AccountPage/AccountInfo';
import { Invoices } from '../components/AccountPage/Invoices';
import { Notifications } from '../components/AccountPage/Notifications';

export const AccountPage = () => {
  const [value, setValue] = useState(0); 
  const [fadeIn, setFadeIn] = useState(false);

  // Función para manejar el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFadeIn(false); 
  };

  useEffect(() => {
 
    setFadeIn(true);
  }, [value]);

  return (
    <Box p={3}>
      <h1>Mi Cuenta</h1>


      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Información de Cuenta" />
          <Tab label="Historial de Solicitudes" />
          <Tab label="Facturas" />
          <Tab label="Notificaciones" />
        </Tabs>
      </Paper>

      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Fade in={fadeIn} timeout={700}>
              <div>
                {value === 0 && <AccountInfo />}
                {value === 1 && <RequestHistory />}
                {value === 2 && <Invoices />}
                {value === 3 && <Notifications />}
              </div>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
