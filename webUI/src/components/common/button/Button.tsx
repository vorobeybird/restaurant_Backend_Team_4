import { ReactNode } from "react";
import "./button.scss";
import { MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  name?: string;
  disabled?: boolean
}

export const Button = ({ children, onClick, name, type, disabled }: ButtonProps) => {
  return (
    <div className="button">
      <button
        type={type}
        name={name}
        disabled={disabled}
        onClick={onClick ? (elem) => onClick(elem) : undefined}
      >
        {children}
      </button>

    </div>
  );
};
