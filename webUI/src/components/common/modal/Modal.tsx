import { Component } from "react";
import "./modal.scss";

interface IModalProps {
    active: Boolean;
    title: String;
    setActive: Function;
    children: any;
}
const Modal = ({active, title, setActive, children}: IModalProps)=> {

    return (
        <div className={active ? "modal active" : "modal"} onClick={(e)=>setActive(false) }>
            <div className={active ? "modal__content active" : "modal__content"} onClick={(e)=>e.stopPropagation()}>
                <h3 className="title">{title}</h3>
            {children}
            </div>
        </div>
    )
}
export default Modal;