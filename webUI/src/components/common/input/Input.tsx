import "./input.scss";
import { ChangeEvent } from 'react'; 

export interface InputProps {
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
}

const Input = ({ placeholder, onChange, type, name }: InputProps) => {
  return (
    <div className="main_input_container">
      <input name={name} type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
