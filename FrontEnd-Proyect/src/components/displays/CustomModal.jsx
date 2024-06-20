import { useEffect,useRef } from "react";
const CustomModal = ({ title, content, reset, form, modalSize }) => {

   const modalref = useRef(null)
    useEffect(()=>{
        if(modalref.current){
            modalref.current.addEventListener('hidden.bs.modal',reset)
        }
        return ()=>{
            if(modalref.current){
                modalref.current.addEventListener('hidden.bs.modal', reset)
            }
        }
    },[reset])
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalref}>
            <div className={modalSize ? `modal-dialog modal-dialog-centered  ${modalSize}` : `modal-dialog modal-dialog-centered`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>reset()} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                        <button type="submit" className="btn btn-primary" form={form} >Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal ;
