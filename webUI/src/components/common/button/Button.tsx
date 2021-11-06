import { ReactNode } from "react";
import "./button.scss";
import { MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  name?: string;
}

export const Button = ({ children, onClick, name }: ButtonProps) => {
  return (
    <div className="button">
      <button
        name={name}
        onClick={onClick ? (elem) => onClick(elem) : undefined}
      >
        {children}
      </button>
    </div>
  );
};
