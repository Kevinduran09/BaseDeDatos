import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(msj, text, icon, foco=''){
    onfocus(foco)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:msj,
        text:text,
        icon:icon
    })
}
export function show_option(title,msj,icon,foco=''){
    onfocus(foco)
    const MySwal = withReactContent(Swal)
    Swal.fire({
        title: title,
        text: msj,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
           return true
        }else{return false}
    });
}
function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus()
    }
}

