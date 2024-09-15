import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EmployeColumns } from "./EmployeColumns";
import { TableComponent } from "../TableComponent";
import { getEmployes } from "../../services/EmployeService";
export const Employe = () => {
  const { columns } = EmployeColumns();
  const {
    isError,
    isLoading,
    data: empleados,
  } = useQuery({
    queryKey: ["empleados"],
    queryFn: getEmployes,
  });
  return (
    <TableComponent
      columns={columns}
      isError={isError}
      isLoading={isLoading}
      rowsSet={empleados}
      route={"/app/employes/:id"}
    />
  );
};
