import React from "react";
import { TableComponent } from "../TableComponent";
import { SolicitudColumns } from "./SolicitudColumns";
import { getSolicitudes } from "../../services/SolicitudService";
import { useQuery } from "@tanstack/react-query";


export const Solicitud = () => {
  const { columns } = SolicitudColumns();
  const {
    isError,
    data: solicitudes,
    isLoading,
  } = useQuery({
    queryKey: ["solicitudes"],
    queryFn: getSolicitudes,
  });

  return (
    <TableComponent
      route={"/app/solicitudes/:id"}
      isLoading={isLoading}
      isError={isError}
      rowsSet={solicitudes}
      columns={columns}
    />
  );
};
