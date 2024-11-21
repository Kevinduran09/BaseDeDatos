import React from 'react'
import { TableComponent } from "../TableComponent";
import { viajeChoferColumns } from './ViajeChoferColumns';
import { useQuery } from "@tanstack/react-query";
import { getViajesByChofer } from '../../services/ViajeService';
import { useAuthStore } from '../../store/useAuthStore';
export const ViajesChofer = () => {

    const { columns } = viajeChoferColumns()
    const {currentUser} = useAuthStore()
    const {
        isError,
        data: viajes,
        isLoading,
    } = useQuery({
        queryKey: ["viajes-Chofer", currentUser.issEmpleado],
        queryFn: () => getViajesByChofer(currentUser.issEmpleado),
    });
    return (
        <TableComponent
           
            isLoading={isLoading}
            isError={isError}
            rowsSet={viajes}
            columns={columns}
        />
    )
}
