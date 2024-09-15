import React from "react";

import { ClientColumns } from "./ClientColumns";
import { TableComponent } from "../TableComponent";
import { getClients } from "../../services/ClientService";
import { useQuery } from "@tanstack/react-query";
export const Client = () => {
  const { columns } = ClientColumns();
  const {
    isError,
    data: clientes,
    isLoading,
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClients,
  });

  return (
    <TableComponent
      route={"/app/clients/:id"}
      isLoading={isLoading}
      isError={isError}
      rowsSet={clientes}
      columns={columns}
    />
  );
};
