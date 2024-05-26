
import '../../styles/index.css'
import { useState } from 'react'
export const ModalComponent = ({ closeModal, title, onSave, children, isUpdate }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
    closeModal();
  };
  return (
    <div className="overlay">
      <div className="contenedorModal">
        <div className="md-header">
          <h5 className="modal-title">{title}</h5>
          <button onClick={closeModal} type="button" className="btn-close p-md"></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {isUpdate ? (
            <button className={`btn ${isSaving ? 'btn-light' : 'btn-success'}`} disabled={isSaving} onClick={handleSubmit}>
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  &nbsp; Editando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk me-2"></i>Editar
                </>
              )}
            </button>
          ) : (
              <>
                <button className={`btn ${isSaving ? 'btn-light' : 'btn-success'}`} disabled={isSaving} onClick={handleSubmit}>
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              &nbsp; Guardando...
            </>
          ) : (
            <>
              <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
            </>
          )}
        </button>
              </>
          )}
          
          <button id="button-close-modal" className="btn btn-secondary " onClick={closeModal}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
