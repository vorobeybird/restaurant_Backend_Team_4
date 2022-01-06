import {useState} from 'react';

const useTextInput = (validationSchema: (value: string) => boolean) => {
  const [value, setValue] = useState<string>('');
  const [valueIsTouched, setValueIsTouched] = useState<boolean>(false);

  const valueIsValid = validationSchema(value);
  const hasError = !valueIsValid && valueIsTouched;

  const valueChangeHandler = (val: string) => {
    setValue(val);
  };

  const valueBlurHandler = () => {
    setValueIsTouched(true);
  };

  const resetValue = () => {
    setValue('');
    setValueIsTouched(false);
  };

  return {
    value,
    valueIsValid,
    valueIsTouched,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetValue,
  };
};

export default useTextInput;
