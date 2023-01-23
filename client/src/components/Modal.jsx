import './Modal.scss'

export const Modal = ({
  showModal,
  setShowModal,
  cancelAction,
  confirmAction,
}) => {
  return (
    <button 
      className="modal-container"
      style={{
        display: showModal ? "block" : "none"
      }}
      onClick={() => {
        setShowModal(false)}
      }
    >
      <dialog
        className="dialog-box"
        open={showModal}
      >
        <p>"Are you sure you want to delete this card?"</p>
        
        <button
          className="cancel-button"
          onClick={() => cancelAction()}
        >
          No
        </button>

        <button
          className="confirm-button"
          onClick={() => confirmAction()}
        >
          Yes
        </button>
      </dialog>
    </button>
  )
}