import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import { TableComponent } from "../client/TableComponent";
import { Actions } from "../helpers/Actions";
import { VehicleForm } from "../forms/VehicleForm";
import { useForm } from "react-hook-form";
import AdminAPI from "../../Services/AdminAPI"; // Importa la clase AdminAPI
import dayjs from "dayjs";
import { show_option, showMsj, show_alert } from "../../functions";

export const Vehicle = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await AdminAPI.getVehicles(); // Usando AdminAPI para obtener vehículos
      const data = response.data || [];
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () =>
    reset({
      idVehiculo: "",
      tipoVehiculo: "",
      placa: "",
      capacidad: 0,
      modelo: "",
      fechaCompra: null,
      anoVehiculo: null,
      fichaTecnica: "",
    });

  const handleSave = async (data) => {
    data["fechaCompra"] = dayjs(data.fechaCompra).format("YYYY-MM-DD");
    data["anoVehiculo"] = dayjs(data.anoVehiculo).format("YYYY");
    try {
      let result = null;
      console.log(data);

      if (data.idVehiculo != "") {
        result = await AdminAPI.updateVehicle(data); // Usando AdminAPI para actualizar vehículo
        showMsj("Actualizado con éxito el vehículo");
      } else {
        result = await AdminAPI.createVehicle(data); // Usando AdminAPI para crear vehículo
        showMsj("Creado con éxito el vehículo");
      }
      fetchVehicles(); // Actualizar la lista después de crear o actualizar
    } catch (error) {
      console.error(error);
      show_alert({
        icon: "error",
        title: "No se pudo crear/actualizar el vehículo",
      });
    }
    reset();
  };

  const selectedVehicle = (vehicle) => {
    Object.keys(vehicle).forEach((key) => {
      setValue(key, vehicle[key]);
    });
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const flag = await show_option(
        "Eliminar",
        "¿Desea eliminar el vehículo?",
        "warning"
      );
      if (flag) {
        const res = await AdminAPI.deleteVehicle(id); // Usando AdminAPI para eliminar vehículo
        showMsj("Se eliminó con éxito");
        fetchVehicles(); // Actualizar la lista después de eliminar
      }
    } catch (error) {
      console.error(error);
      show_alert({ icon: "error", title: "No se pudo eliminar el vehículo" });
    }
  };

  const columns = [
    { field: "idVehiculo", headerName: "ID", width: 50 },
    { field: "tipoVehiculo", headerName: "Tipo", width: 150 },
    { field: "placa", headerName: "Placa", width: 150 },
    { field: "capacidad", headerName: "Capacidad", width: 150 },
    { field: "modelo", headerName: "Modelo", width: 150 },
    { field: "fechaCompra", headerName: "Fecha de Compra", width: 150 },
    { field: "anoVehiculo", headerName: "Año", width: 150 },
    { field: "fichaTecnica", headerName: "Ficha Técnica", width: 150 },
    {
      field: "Edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <>
          <Actions
            {...{ params }}
            editFuntion={selectedVehicle}
            deleteFunction={handleDeleteVehicle}
          />
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-3">
      <TableComponent data={vehicles} columns={columns} reset={resetForm} />
      <CustomModal
        form={"vehicle-form"}
        reset={resetForm}
        title="Formulario de Vehículo"
        content={
          <VehicleForm
            handleSave={handleSubmit(handleSave)}
            errors={errors}
            control={control}
            register={register}
          />
        }
      />
    </div>
  );
};
