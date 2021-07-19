import React, { useEffect } from "react";

import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, selectImage }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  console.log(selectImage);
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={selectImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.defaultProps = {
  onClose: () => null,
};

Modal.propType = {
  onClose: PropTypes.func,
};

export default Modal;
