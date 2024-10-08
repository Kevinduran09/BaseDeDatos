import React from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { UpdateButton } from "../buttons/UpdateButton";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useClientActions } from "./handler/useClientActions";
export const ClientColumns = () => {
  const { deleteCliente, hanleClientDetail } = useClientActions();
  const columns = [
    {
      field: "idCliente",
      headerName: "ID",
      width: 50,
    },
    { field: "cedula", headerName: "Cedula", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "correoElectronico", headerName: "Email", width: 150 },
    { field: "direccion", headerName: "Dirección", width: 150 },
    {
      field: "telefono",
      headerName: "Teléfonos",
      width: 150,
      renderCell: (params) => (
        <>
          <FormControl
            variant="filled"
            sx={{
              m: 0,
              minWidth: 150,
              padding: "2px",
              backgroundColor: "#fff",
            }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              displayEmpty
              value={""}
              sx={{ backgroundColor: "#fff" }}
            >
              {params.row.telefonos.map((telefono) => (
                <MenuItem
                  key={telefono.idTelefono}
                  value={telefono.idTelefono}
                  onClick={() => confirmDeletePhone(telefono.idTelefono)}
                >
                  {`Teléfono: ${telefono.numeroTelefono}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ),
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton handleDelete={deleteCliente} id={params.row.id} />
        </>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          <UpdateButton
            handleUpdate={hanleClientDetail}
            id={params.row.idCliente}
          />
        </>
      ),
    },
  ];

  return { columns };
};
