import { ReactElement, ReactNode, useEffect, useState } from "react";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import "../bookTable/BookTable";

interface SliderProps {
  steps: IStep[],
  onStepChange: (step: number) => void
}

interface IStep {
    component: ReactNode,
    validate: Function;
  }

export const SliderComponent = ({steps, onStepChange}: SliderProps) => {

  const [currentStep, setCurrentStep] = useState(0);
  const selectedStep = steps[currentStep];

  const handleChangeCurrentStepPrev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);;
  };

  useEffect(() => {
    onStepChange(currentStep);
  }, [currentStep]);

  const handleChangeCurrentStepNext = () => {
    if (currentStep < steps.length - 1 && selectedStep.validate()) {
      setCurrentStep((step) => step + 1);
    }
  };

  return (
    <div className="booktable_container_wrapper">
      <h1 style={{ padding: "20px" }}>Оформление заказа</h1>
      <div className="booktable_container">
        <button
          className={
            currentStep === 0 ? "swiper_disabled" : 
           "swiper_booktable_left"}
          type="button"
          onClick={handleChangeCurrentStepPrev}
        >
          <img src={PrevStepIcon} alt="prev" />
        </button>
        {selectedStep.component}
        <button
          className={
            currentStep === steps.length - 1 ? "swiper_disabled" : 
           "swiper_booktable_left"}
          type="button"
          onClick={handleChangeCurrentStepNext}
        >
          <img src={NextStepIcon} alt="next" />
        </button>
      </div>
      <div className="step_progress">
        Шаг {currentStep + 1}/{steps.length}
      </div>
    </div>
  );
};
