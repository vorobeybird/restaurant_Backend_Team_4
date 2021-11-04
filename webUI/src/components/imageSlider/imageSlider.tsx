import React, { FunctionComponent, useState} from "react"
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';

export const ImageSlider: FunctionComponent<IimageSliderProps> = (props) => {

    const [current, setCurrent] = useState(0 as number);
    const length = props.sliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    return (
        <div className="slider">
            <FaArrowAltCircleLeft className="slider-left-arrow" onClick={prevSlide} />
            {props.sliderData.map((slide: any, index: number) => {
                return (
                    <div className={index === current ? "slide active" : "slide"} key={index}>
                        {index === current &&
                         (<img src={slide.image} alt="dish-image" className="slider-img"/>)}
                    </div>
                )
            })}
            <FaArrowAltCircleRight className="slider-right-arrow" onClick={nextSlide} />
        </div>
    )
}

interface IimageSliderProps {
    sliderData: { image: string }[]
}