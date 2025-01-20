import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";
const CustomModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);
  return createPortal(
    <div className={`modal-overlay ${isOpen && "show"}`}>
      <div className="modal" ref={modalRef}>
        {children}
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
};

export default CustomModal;
