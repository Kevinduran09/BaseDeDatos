import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TableComponent } from '../TableComponent';
import { getAuditoriasUsuario } from '../../services/AuditoriaService';

export const AuditoriaUsuario = () => {
    const { isError, data: auditorias, isLoading } = useQuery({
        queryKey: ['auditoriasUsuario'],
        queryFn: getAuditoriasUsuario,
    });

    return (
        <TableComponent
            route={"/app/auditoria-usuario/create"}
            isLoading={isLoading}
            isError={isError}
            rowsSet={auditorias}
            columns={columnsAuditoriaUsuario()}
        />
    );
};

// Puedes definir las columnas según la estructura de tu tabla
const columnsAuditoriaUsuario = () => [
    { field: 'idAuditoria', label: 'ID Auditoría' },
    { field: 'nombreUsuario', label: 'Nombre Usuario' },
    { field: 'fechaCreacion', label: 'Fecha Creación', width: 200 },
    { field: 'fechaUltimaModificacion', label: 'Fecha Última Modificación', width: 200 },
    { field: 'funcion', label: 'Función', width: 100 },
    { field: 'usuarioResponsable', label: 'Usuario Responsable', width: 75 },
    { field: 'fechaFuncion', label: 'Fecha Función', width: 200, }
];
