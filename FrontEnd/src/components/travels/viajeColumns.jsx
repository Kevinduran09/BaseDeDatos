import React from 'react'
import { CustomButton } from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from 'hugeicons-react'
import { PencilEdit02Icon } from 'hugeicons-react';
export const viajeColumns = () => {
    const navigate = useNavigate(); 
    const columns = [
        { field: "idViaje", headerName: "ID", width: 50 },
        {
            field: "fechaViaje",
            headerName: "fechaViaje",
            width: 150,
        },
        {
            field: "TotalSolicitudes",
            headerName: "TotalSolicitudes",
            width: 150,
        },
        {
            field: "NombreEncargado",
            headerName: "NombreEncargado",
            width: 150,
        },
        {
            field: "CargoEncargado",
            headerName: "CargoEncargado",
            width: 150,
        },
        {
            field: "Eliminar",
            headerName: "Eliminar",
            width: 130,
            renderCell: (params) => (
                <CustomButton
                    icon={<PencilEdit02Icon
                        size={24}
                        color={"#ffffff"}
                        variant={"stroke"}
                    />}
                    action={() => deleteCliente(params.row.idViaje)}
                    text="Eliminar"
                    color="error"
                    variant="contained"
                />
            ),
        },
        {
            field: "Ver Detalle",
            headerName: "Detalle",
            width: 130,
            renderCell: (params) => (
                <CustomButton
                    icon={<EyeIcon
                        size={24}
                        color={"#ffffff"}
                        variant={"stroke"}
                    />}
                    action={() => navigate(`detalle/${params.row.idViaje}`)} 
                    text="Ver"
                    color="primary"
                    variant="contained"
                />
            ),
        },
    ] 



    return { columns };
}
