import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(data) {

    const MySwal = withReactContent(Swal)
    MySwal.fire(
        data
    )
}
export async function  show_option(title, msj, icon,confirmText='Sí, eliminarlo')  {
    
    const MySwal = withReactContent(Swal)
    const result = await  MySwal.fire({
        title: title,
        text: msj,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
        return true
    } else { return false }
}

export function showMsj(msj,icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: msj
    });
}
