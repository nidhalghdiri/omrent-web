"use client";

import { useCallback, useEffect, useState } from "react";
import Input from "../elements/Input";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, body }) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  return (
    <>
      <div
        className={`modal fade ${isOpen ? "show d-block" : ""}`}
        id="modalLogin"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="flat-account bg-surface">
              <h3 className="title text-center">{title}</h3>
              <span className="close-modal icon-close2" onClick={handleClose} />
              {body}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`modal-backdrop fade show`} onClick={handleClose} />
      )}
    </>
  );
};

export default Modal;
