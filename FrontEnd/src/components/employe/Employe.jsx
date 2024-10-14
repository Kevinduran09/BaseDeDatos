import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EmployeColumns } from "./EmployeColumns";
import { TableComponent } from "../TableComponent";
import { getEmployees } from "../../services/EmployeService";
import { Button } from "@mui/material";
export const Employe = () => {
  const { columns } = EmployeColumns();
  const {
    isError,
    isLoading,
    data: empleados,
  } = useQuery({
    queryKey: ["empleados"],
    queryFn: getEmployees,
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
