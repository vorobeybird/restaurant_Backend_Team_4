import "./input.scss";

export interface InputProps {
  placeholder: string;
  onChange?: () => void;
}

const Input = ({ placeholder, onChange }: InputProps) => {
  return (
    <div className="main_input_container">
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
