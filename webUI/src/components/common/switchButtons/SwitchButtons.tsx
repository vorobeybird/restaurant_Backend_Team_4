import { ReactNode } from "react";
import "./SwitchButtons.scss";
import { MouseEvent } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClickNext: () => void;
  onClickPrev: () => void;
  firstValue?: string;
  secondValue?: string;
  buttonClass?: string;
}

export const SwitchButtons: React.FC<ButtonProps> = ({
  onClickNext,
  onClickPrev,
  firstValue,
  secondValue,
  buttonClass,
}) => {
  return (
    <div className="switch-button-container">
      <button
        className={buttonClass ? buttonClass : "switch-button"}
        onClick={onClickPrev}
      >
        {secondValue ? secondValue : "Отмена"}
      </button>
      <button
        className={buttonClass ? buttonClass : "switch-button"}
        onClick={onClickNext}
      >
        {firstValue ? firstValue : "Далее"}
      </button>
    </div>
  );
};
