import { ReactNode } from "react";
import "./button.scss";
import { MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  name?: string;
}

export const Button = ({ children, onClick, name, type }: ButtonProps) => {
  return (
    <div className="button">
      <button
        type={type}
        name={name}
        onClick={onClick ? (elem) => onClick(elem) : undefined}
      >
        {children}
      </button>

    </div>
  );
};
