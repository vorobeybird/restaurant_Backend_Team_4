import "./modal.scss";
import close from "../../../assets/close-cross.svg";
import {MouseEventHandler, useEffect} from 'react';

interface IModalProps {
    active: Boolean;
    title: String;
    setActive: MouseEventHandler<HTMLImageElement>;
    children: any;
}
const Modal = ({active, title, setActive, children}: IModalProps)=> {

/*     if (!active) return (
        <div className={"modal"}><div className="modal__container"></div></div>
    ); */
    return (
        <div className={active ? "modal active" : "modal"} onClick={setActive}>
            <div className={active ? "modal__container active" : "modal__container"} onClick={(e)=>e.stopPropagation()}>
            <img className="close" onClick={setActive} src={close}
              alt="close"
            />
                <div className="modal__title">{title}</div>
                <div className="modal__content">
            {children}
            </div>
            </div>
        </div>
    )
}
export default Modal;