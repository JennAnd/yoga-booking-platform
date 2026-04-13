/**
 * Reusable modal component for simple confirmations and dialogs.
 */

import "./ui.css";

function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="ui-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ui-modal__header">
          <h2 id="modal-title" className="ui-modal__title">
            {title}
          </h2>

          <button
            type="button"
            className="ui-modal__close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="ui-modal__content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
