import { InputProps } from "./Input";
import "./input.scss";

interface InputCTAProps extends Omit<InputProps, "onChange"> {
  onClick: () => void;
  Icon: string;
}

const InputCTA = ({ onClick, placeholder, Icon }: InputCTAProps) => {
  return (
    <div className="main_inputCTA_container">
      <input placeholder={placeholder} disabled />
      <div className="main_inputCTA_img">
        <img src={Icon} alt="calendar" onClick={onClick} />
      </div>
    </div>
  );
};

export default InputCTA;
