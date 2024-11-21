import Swal from "sweetalert2";
const styles = `
  .swal-custom-zindex {
    z-index: 9999 !important;
  }
`;
export const EliminarDialogo = (mutation, id) => {
  Swal.fire({
    title: "Estas seguro?",
    text: "Esta accion no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
    customClass: {
      popup: "swal-custom-zindex",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      mutation.mutate(id);
    }
  });
};

export const ConfirmarDialogo = (mutation, data, onSuccess) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede revertir.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "swal-custom-zindex",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      mutation.mutate(data, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
        },
        onError: (error) => {
          if (error.response.status == 400) {
             (error.response.data.message);

          
            ErrorDialogo("Error", error.response.data.message);
          } else {
             (error);
            ErrorDialogo(error.response.data.message, error.response.data.error);
          }
        },
      });
    }
  });
};


export const ErrorDialogo = (title, data) => {
  Swal.fire({
    title: title,
    text: data,
    icon: "error",
    customClass: {
      popup: "swal-custom-zindex",
    },
  });
};

export const SuccessDialogo = (title, tipo, accion) => {
  Swal.fire({
    title: title,
    text: `${tipo} ${accion} correctamente`,
    icon: "success",
    customClass: {
      popup: "swal-custom-zindex",
    },
  });
};

export function msjDialogo(title, text = null, icon, onSuccess = null) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: 1000,
    showConfirmButton: false,
    willClose: onSuccess && onSuccess(),
  });
}
