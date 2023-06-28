import Classes from "./modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={Classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={Classes.modal} >
      <div className={Classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose = {props.onClose}></Backdrop>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay >{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
