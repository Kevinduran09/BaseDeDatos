import React, { useState } from 'react';
import { Paper, Typography, Box, Button, TextField, Grid, InputAdornment } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { backupDatabase } from '../services/BackendService'; 
import Swal from 'sweetalert2';
import BackupIcon from '@mui/icons-material/Backup';
import FolderIcon from '@mui/icons-material/Folder';

export const ConfiguracionDashboard = () => {
    const [backupPath, setBackupPath] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

   
    const handlePathChange = (event) => {
        setBackupPath(event.target.value);
    };


    const { mutate: handleBackupAction } = useMutation({
        mutationFn: backupDatabase,
        onSuccess: () => {
            Swal.fire('¡Éxito!', 'El backup se ha generado correctamente.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Hubo un problema al generar el backup.', 'error');
        },
    });

   
    const handleGenerateBackup = () => {
        if (!backupPath) {
            Swal.fire('Error', 'Por favor ingresa una ruta válida.', 'warning');
            return;
        }

        setIsLoading(true);
        handleBackupAction(backupPath); 
        setIsLoading(false);
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: '600px', margin: '0 auto',boxShadow:'none' }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Configuración del Dashboard
            </Typography>

            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">Generar Backup</Typography>
                <Typography variant="body1" paragraph>
                    Ingresa la ruta donde deseas guardar el backup de la base de datos.
                </Typography>

              
                <TextField
                    label="Ruta de Backup"
                    variant="outlined"
                    fullWidth
                    value={backupPath}
                    onChange={handlePathChange}
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FolderIcon />
                            </InputAdornment>
                        ),
                    }}
                />

               
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleGenerateBackup}
                    startIcon={<BackupIcon />}
                    disabled={isLoading}
                    sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#45a049',
                        },
                    }}
                >
                    {isLoading ? 'Generando...' : 'Generar Backup'}
                </Button>
            </Box>
        </Paper>
    );
};
