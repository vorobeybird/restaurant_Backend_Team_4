import "./input.scss";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import debounce from "lodash.debounce";

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
    onError?: (text: string) => void
    error?: string
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
               }: InputProps) => {


    const debouncedValidation = useMemo(() => {
        return debounce((text: any) => {
            if (validationSchema) {
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
        }, 700)
    }, [validationSchema])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        debouncedValidation(e.target.value);
        if (onChange) {
            onChange(e);
        }
    }, [validationSchema])

    return (
        <div className="main_input_container">
            <input className={error ? "invalid" : ""}
                   id={id}
                   name={name}
                   type={type}
                   placeholder={placeholder}
                   onChange={onChangeHandler}
                   value={value}
                   required={isRequired}
            />
            <p className={"error-text"}>{error ? error : ""}</p>
        </div>
    );
};

export default Input;
