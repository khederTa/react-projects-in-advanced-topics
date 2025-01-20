import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const DialogModal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    dialog.addEventListener("close", onClose);

    return () => {
      dialog.removeEventListener("close", onClose);
    };
  }, [onClose]);

  // Handle clicks on the backdrop (workaround for <dialog>)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    const handleBackdropClick = (event) => {
      // Check if the click is on the backdrop
      const rect = dialog.getBoundingClientRect();
      const isClickOnBackdrop =
        rect.top > event.clientY ||
        rect.bottom < event.clientY ||
        rect.left > event.clientX ||
        rect.right < event.clientX;

      if (isClickOnBackdrop) {
        dialog.close(); // Close the dialog
        onClose(); // Call the onClose callback
      }
    };

    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.querySelector("#modal-container")
  );
};

export default DialogModal;
