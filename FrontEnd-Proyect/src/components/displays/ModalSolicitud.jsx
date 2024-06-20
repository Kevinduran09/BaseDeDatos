import { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
const CustomModal = ({ title, content, reset, form, modalSize }) => {
    const navegate = useNavigate()
    const modalref = useRef(null)
    useEffect(() => {
        if (modalref.current) {
            modalref.current.addEventListener('hidden.bs.modal', () => reset() )
        }
        return () => {
            if (modalref.current) {
                modalref.current.addEventListener('hidden.bs.modal', () => reset())
            }
        }
    }, [reset])
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalref}>
            <div className={modalSize ? `modal-dialog modal-dialog-centered  ${modalSize}` : `modal-dialog modal-dialog-centered`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
