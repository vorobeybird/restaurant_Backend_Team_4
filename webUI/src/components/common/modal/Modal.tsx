import "./modal.scss";
import close from "../../../assets/close-cross.svg";
import {useEffect} from 'react';

interface IModalProps {
    active: Boolean;
    title: String;
    setActive: Function;
    children: any;
}
const Modal = ({active, title, setActive, children}: IModalProps)=> {

/*     useEffect(()=> {
        if (active) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'scroll';
          }
    },[active]) */
    return (
        <div className={active ? "modal active" : "modal"} onClick={(e)=>setActive(false) }>
            <div className={active ? "modal__container active" : "modal__container"} onClick={(e)=>e.stopPropagation()}>
            <img className="close" onClick={(e)=>setActive(false) } src={close}
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