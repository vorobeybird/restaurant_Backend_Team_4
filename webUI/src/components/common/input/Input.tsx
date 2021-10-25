import "./input.scss";
import {ChangeEvent} from "react";

export interface InputProps {
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
}

const Input = ({ placeholder, onChange, type, value }: InputProps) => {
  return (
    <div className="main_input_container">
      <input value={value} type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
