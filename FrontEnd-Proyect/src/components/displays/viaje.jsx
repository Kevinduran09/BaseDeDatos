import React, { useState, useEffect } from "react";
import { TableComponent } from "../client/TableComponent";
import AdminAPI from "../../Services/AdminAPI";
import { Actions } from "../helpers/Actions";
import { show_option, showMsj, show_alert } from "../../functions";
import { useNavigate } from "react-router-dom";

export const Viaje = () => {
  const storedAuth = JSON.parse(sessionStorage.getItem("current"));
  const userRole = storedAuth?.cargo;
  const [viajes, setViajes] = useState([]);
  const navegate = useNavigate();
  useEffect(() => {
    fetchViajes();
  }, []);

  const fetchViajes = async () => {
    try {
      let response;
      const instance = JSON.parse(sessionStorage.getItem("current"));
      if (instance.cargo === "Chofer") {
        response = await AdminAPI.getViajesByChofer(instance.issEmpleado);
      } else {
        response = await AdminAPI.getViajes();
      }
      console.log(response.data);
      const data = response.data || [];
      setViajes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const showInfoViaje = (viaje) => {
    navegate(`/admin/viaje/${viaje.idViaje}`);
  };

  const handleDeleteViaje = async (id) => {
    console.log(userRole);
    if (userRole == "Chofer") {
      show_alert({
        title:
          "No tiene los permisos para eliminar un viaje, solo un administrador puede hacerlo!!",
        icon: "error",
        timer: 1200,
      });
      return;
    }

    try {
      const flag = await show_option(
        "Eliminar",
        "¿Desea eliminar el viaje?",
        "warning"
      );
      if (flag) {
        await AdminAPI.deleteViaje(id);
        showMsj("Se eliminó con éxito el viaje");
        fetchViajes();
      }
    } catch (error) {
      console.error(error);
      show_alert({ icon: "error", title: "No se pudo eliminar el viaje" });
    }
  };

  const columns = [
    { field: "idViaje", headerName: "ID", width: 50 },
    { field: "fechaViaje", headerName: "Fecha", width: 150 },
    {
      field: "vehiculo",
      headerName: "Vehículo",
      width: 150,
      renderCell: (params) => params.row.vehiculo.tipoVehiculo,
    },
    {
      field: "empleados",
      headerName: "Empleados",
      width: 300,
      renderCell: (params) => (
        <>
          {params.row.empleados.map((empleado) => (
            <div
              key={empleado.idEmpleado}
            >{`${empleado.nombre} ${empleado.apellido}`}</div>
          ))}
        </>
      ),
    },
    {
      field: "Edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <Actions
          {...{ params }}
          editFuntion={showInfoViaje}
          deleteFunction={handleDeleteViaje}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid mt-3">
        <TableComponent data={viajes} columns={columns} reset={null} />
      </div>
    </>
  );
};
