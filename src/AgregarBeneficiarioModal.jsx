import React, { useState } from 'react';
import './AgregarBeneficiarioModal.css';

const AgregarBeneficiarioModal = ({ showModal, onClose }) => {
  const [modalActive, setModalActive] = useState(false);
  const [buttonId, setButtonId] = useState('');

  var modalClassName = 'modal hide one'

  const handleModalContainerClick = () => {
    e.stopPropagation(); // Evita que el evento se propague al hacer clic dentro del modal
    document.getElementById('modal-container').classList.add('out');
    document.body.classList.remove('modal-active');
    setModalActive(false);
  };

  modalClassName = showModal ? 'modal show one' : 'modal show one out';

  return (
    <div id="modal-container" className={modalClassName} onClick={handleModalContainerClick}>
      <div className="modal-background">
        <div className="modal-content modal-container" style={{ backgroundColor: 'black' }}>
          <span className="close" onClick={onClose}>&times;</span>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
          </div>
          <div className="modal-body modal-body-center">
            <h2>Agregar Beneficiario</h2>
            {/* Aquí puedes colocar el contenido del formulario para agregar beneficiarios */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarBeneficiarioModal;
