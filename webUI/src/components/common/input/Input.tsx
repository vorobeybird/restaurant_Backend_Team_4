import "./input.scss";
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import debounce from "lodash.debounce";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/all";

export interface InputProps {
    placeholder?: string;
    type?: string;
    name?: string;
    value?: string;
    id?: string;
    isRequired?: boolean;
    validationSchema?: any;
    errorMessage?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onError?: (text: string) => void;
    error?: string;
    validate?: (text: string) => boolean;
    isToggled?: boolean;
}

const Input = ({
                   placeholder,
                   type,
                   name,
                   value,
                   id,
                   isRequired,
                   validationSchema,
                   errorMessage,
                   error,
                   onChange,
                   onError,
                   validate,
                   isToggled,
               }: InputProps) => {

    const [touched, setTouched] = useState(false);
    const [isHide, setIsHide] = useState<boolean>(true);

    const toggleHideHandler = useCallback(() => {
        if (isHide) {
            setIsHide(false);
        } else {
            setIsHide(true)
        }
    }, [isHide]);

    const debouncedValidation = useMemo(() => {

        return debounce((text: any) => {
            if (typeof validate === "function") {
                if (validate(text)) {
                    if (onError) {
                        onError("");
                    }
                } else {
                    if (errorMessage) {
                        if (onError) {
                            onError(errorMessage);
                        }
                    }
                }
            } else if (validationSchema) {
                if (validationSchema.test(text)) {
                    if (onError) {
                        onError("");
                    }
                } else {
                    if (errorMessage) {
                        if (onError) {
                            onError(errorMessage);
                        }
                    }
                }
            }

        }, 400)
    }, [validationSchema, validate]);

    useEffect(() => {
        if (touched) {
            debouncedValidation(value);
        }
    }, [debouncedValidation, value]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!touched) {
            setTouched(true);
        }
        // debouncedValidation(e.target.value);
        if (onChange) {
            onChange(e);
        }
    }, [debouncedValidation]);

    return (
            <div className="main-input">
                <div className={"main-input__content"}>
                    <input className={error ? "invalid" : ""}
                           id={id}
                           name={name}
                           type={isHide ? type : "text"}
                           placeholder={placeholder}
                           onChange={onChangeHandler}
                           value={value}
                           required={isRequired}
                    />
                    {isToggled && <button type="button" className={'toggle-button'} onClick={toggleHideHandler}>
                        {isHide ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                    </button>}
                </div>
                <div className="main-input__error">
                    {error ? error : ""}
                </div>
            </div>
    );
};

export default Input;
