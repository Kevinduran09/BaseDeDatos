import React from "react";
import { VehicleColumns } from "./VehicleColumns";
import { TableComponent } from "../TableComponent";
import { getVehicles } from "../../services/VehicleService";
import { useQuery } from "@tanstack/react-query";

export const Vehicle = () => {
  const { columns } = VehicleColumns();
  const {
    isError,
    data: vehicles,
    isLoading,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  return (
    <TableComponent
      route={"/app/vehicles/create"}
      isLoading={isLoading}
      isError={isError}
      rowsSet={vehicles}
      columns={columns}
    />
  );
};
