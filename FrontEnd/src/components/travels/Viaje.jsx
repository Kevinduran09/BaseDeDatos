import React from 'react'
import { TableComponent } from "../TableComponent";
import { viajeColumns } from './viajeColumns';
import { useQuery } from "@tanstack/react-query";
import { getViajes } from '../../services/ViajeService';
export const Viaje = () => {

    const {columns}= viajeColumns()

    const {
        isError,
        data: viajes,
        isLoading,
    } = useQuery({
        queryKey: ["viajes"],
        queryFn: getViajes,
    });
    return (
        <TableComponent
            route={"/app/travels/establecer"}
            isLoading={isLoading}
            isError={isError}
            rowsSet={viajes}
            columns={columns}
        />
    )
}
