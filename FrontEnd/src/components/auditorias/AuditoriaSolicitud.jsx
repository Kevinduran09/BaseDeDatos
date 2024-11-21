import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TableComponent } from '../TableComponent';
import { getAuditoriasSolicitud } from '../../services/AuditoriaService';

export const AuditoriaSolicitud = () => {
    const { isError, data: auditorias, isLoading } = useQuery({
        queryKey: ['auditoriasSolicitud'],
        queryFn: getAuditoriasSolicitud,
    });

    return (
        <TableComponent
            route={"/app/auditoria-solicitud/create"}
            isLoading={isLoading}
            isError={isError}
            rowsSet={auditorias}
            columns={columnsAuditoriaSolicitud()}
        />
    );
};

// Puedes definir las columnas según la estructura de tu tabla
const columnsAuditoriaSolicitud = () => [
    { field: 'auditID', label: 'ID Auditoría' },
    { field: 'idSolicitud', label: 'ID Solicitud' },
    { field: 'operacion', label: 'Operación' },
    { field: 'fechaOperacion', label: 'Fecha Operación', width: 200 },
    { field: 'usuarioResponsable', label: 'Usuario Responsable' },
    { field: 'campoModificado', label: 'Campo Modificado' },
    { field: 'valorAnterior', label: 'Valor Anterior' },
    { field: 'valorNuevo', label: 'Valor Nuevo' }
];
