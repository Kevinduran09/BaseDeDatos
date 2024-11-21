import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createEmploye,
  deleteEmploye,
  updateEmploye,
  getEmploye,
  getPuestos
} from "../../../services/EmployeService";
import { SuccessDialogo, ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useState } from "react";

export const useEmployeeActions = () => {
  const queryClient = useQueryClient();
  const [empleado, setEmpleado] = useState({});

  const deleteMutation = useMutation({
    mutationFn: deleteEmploye,
    onSuccess: () => {
      queryClient.invalidateQueries("empleados");
      SuccessDialogo("Eliminado", "Empleado", "eliminado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createMutation = useMutation({
    mutationFn: createEmploye,
    onSuccess: () => {
      queryClient.invalidateQueries("empleados");
      SuccessDialogo("Creado", "Empleado", "creado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEmploye,
    onSuccess: () => {
      queryClient.invalidateQueries("empleados");
      SuccessDialogo("Actualizado", "Empleado", "actualizado");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteEmpleado = (id) => {
    ConfirmarDialogo(deleteMutation, id, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const createEmpleado = (data) => {
    ConfirmarDialogo(createMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const updateEmpleado = (data) => {
    ConfirmarDialogo(updateMutation, data, () => {
      // Este callback puede estar vacío o incluir lógica adicional si es necesario.
    });
  };

  const fetchEmpleado = async (id) => {
    const empleado = await getEmploye(id);
    setEmpleado(empleado); // Almacena el empleado en el estado
    return empleado;
  };
  const fetchPuestos = async () =>{
    const puestos = await getPuestos()
    return puestos
  }
  return {
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    fetchEmpleado,
    fetchPuestos
  };
};
