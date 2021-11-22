import { ReactNode } from "react";
import "./SwitchButtons.scss";
import { MouseEvent } from "react";

interface ButtonProps {
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClickNext: () => void;
    onClickPrev: () => void;
    radius: string
    width: string;
}

export const SwitchButtons: React.FC<ButtonProps> = ({ 
    border,
    color,
    children,
    height,
    onClickNext,
    onClickPrev,
    radius,
    width
  }) => { 
  return (
      <>
    <button 
      onClick={onClickNext}
      style={{
         backgroundColor: color,
         border,
         borderRadius: radius,
         height,
         width
      }}
    >
    {children}
    </button>
    <button 
      onClick={onClickPrev}
      style={{
         backgroundColor: color,
         border,
         borderRadius: radius,
         height,
         width
      }}
    >
    {children}
    </button>
    </>
  );
}
