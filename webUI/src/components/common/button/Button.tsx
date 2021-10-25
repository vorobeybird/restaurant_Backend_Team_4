import "./button.scss";
import {MouseEvent} from "react";

interface ButtonProps {
  children: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  type: "button" | "submit" | "reset" ;
}

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <div  className="button" onClick={onClick}>
      <button type={type}>{children}</button>
    </div>
  );
};
