import React, { FunctionComponent, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import leftArrow from "../../assets/background/btn-left-background.png";
import rightArrow from "../../assets/background/btn-right-background.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface IimageSliderProps {
  sliderData: { image: string }[];
}

export const ImageSlider: FunctionComponent<IimageSliderProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const length = props.sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="slider">
      <button
        className="slider-left-arrow"
        onClick={prevSlide}
        disabled={current === 0 ? true : false}
      >
        <img src={leftArrow} alt="left-arrow" />
      </button>
      {props.sliderData.map((slide: any, index: number) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <LazyLoadImage
                src={slide.image}
                alt="dish-image"
                className="slider-img"
                effect="blur"
              />
            )}
          </div>
        );
      })}
      <button
        className="slider-right-arrow"
        onClick={nextSlide}
        disabled={current === length - 1 ? true : false}
      >
        <img src={rightArrow} alt="right-arrow" />
      </button>
    </div>
  );
};
