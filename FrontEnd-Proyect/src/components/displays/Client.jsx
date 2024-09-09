import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import { TableComponent } from "../client/TableComponent";
import { MenuItem, FormControl, Select } from "@mui/material";
import { show_option, showMsj, show_alert } from "../../functions";
import { Actions } from "../helpers/Actions";
import { ClientForm } from "../forms/ClientForm";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import AdminAPI from "../../Services/AdminAPI";

export const Client = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    getValues,
  } = useForm();
  const [clients, setClients] = useState([]);

  const onSubmit = async (data) => {
    data["fechaIngreso"] = dayjs(Date.now()).format("YYYY-MM-DD");
    let result = null;
    try {
      console.log(data);

      if (data.idCliente != "") {
        result = await AdminAPI.updateClient(data); // Usando AdminAPI para crear cliente
        showMsj("Actualizado con éxito el cliente");
      } else {
        result = await AdminAPI.createClient(data); // Usando AdminAPI para crear cliente
        showMsj("Creado con éxito el cliente");
      }

      if (data.numeroTelefono) {
        await AdminAPI.createTelefono({
          telefono: data.numeroTelefono,
          tipoTelefono: data.tipoTelefono,
          idCliente: result.cliente.idCliente,
        });
      }
      fetchClients(); // Actualizar la lista después de crear
    } catch (error) {
      console.log(error);
      show_alert({ icon: "error", title: "No se pudo crear el cliente" });
    }
    reset();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () =>
    reset({
      idCliente: "",
      cedula: "",
      nombre: "",
      apellido: "",
      correoElectronico: "",
      direccion: "",
      numeroTelefono: "",
      tipoTelefono: 0,
      nombreUsuario: "",
      contrasena: "",
    });
  const fetchClients = async () => {
    try {
      const response = await AdminAPI.getClients();

      const data = response.data || [];

      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectedClient = (client) => {
    Object.keys(client).forEach((key) => {
      setValue(key, client[key]);
    });
    if (client.usuario != null) {
      setValue("nombreUsuario", client.usuario.nombreUsuario);
      setValue("contrasena", client.usuario.contrasena);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      const flag = await show_option(
        "Eliminar",
        "¿Desea eliminar el cliente?",
        "warning"
      );
      console.log(flag);
      if (flag) {
        const res = await AdminAPI.deleteClient(id); // Usando AdminAPI para eliminar cliente

        showMsj("Se eliminó con éxito");
        fetchClients(); // Actualizar la lista después de eliminar
      }
    } catch (error) {}
  };

  const handleDeletePhone = async (phoneId) => {
    try {
      await AdminAPI.deletePhone(phoneId); // Usando AdminAPI para eliminar teléfono
      fetchClients(); // Actualizar la lista después de eliminar
      showMsj("Teléfono eliminado con éxito");
    } catch (error) {
      console.error(error);
      show_alert({ icon: "Error", title: "No se pudo eliminar el teléfono." });
    }
  };

  const confirmDeletePhone = async (phoneId) => {
    const flag = await show_option(
      "Eliminar",
      "¿Estás seguro de eliminar este teléfono?",
      "warning"
    );
    if (flag) {
      handleDeletePhone(phoneId);
    } else {
      show_alert({ icon: "Error", title: "No se pudo crear el cliente" });
    }
  };

  const columns = [
    { field: "idCliente", headerName: "ID", width: 50 },
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
      field: "Edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <>
          <Actions
            {...{ params }}
            editFuntion={selectedClient}
            deleteFunction={handleDeleteClient}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid mt-3">
        <TableComponent data={clients} columns={columns} reset={resetForm} />
        <CustomModal
          form={"client-form"}
          reset={resetForm}
          title="Formulario Cliente"
          content={
            <ClientForm
              getValues={getValues}
              control={control}
              handleSave={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
            />
          }
        />
      </div>
    </>
  );
};
