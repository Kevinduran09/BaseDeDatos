import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(msj,icon,foco=''){
    onfocus(foco)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:msj,
        icon:icon
    })
}
export function show_option(msj,icon,foco=''){
    onfocus(foco)
    const MySwal = withReactContent(Swal)
    Swal.fire({
        title: "",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}
function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus()
    }
}

