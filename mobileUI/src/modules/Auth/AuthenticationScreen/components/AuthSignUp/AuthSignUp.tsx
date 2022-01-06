import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

import useTextInput from '../../../../../hooks/useTextInput';
import styles from '../../styles';
import {addEmail} from '../../../../../store/StoreCard';
import {authActions} from '../../../store/authStore';
import {useAppDispatch} from '../../../../../hooks/hooks';

// добавить валидацию на телефон, желательно с автоазполнением

//for textInput validation
const nameRegEx = new RegExp('^([а-яА-Я]{2,30})');
const isName = (value: string) => nameRegEx.test(value);
const emailRegExp = new RegExp(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/);
const isEmail = (value: string) => emailRegExp.test(value);
const passwordRegEx = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/);
const isPassword = (value: string) => passwordRegEx.test(value);

//messages for errors
const emailErrorMessage =
  'Электронная почта должна быть в формате xxx@yyy.zzz, без специальных символов (#, %, &, !, $, etc.). Обязательно к заполнению.';
const passwordErrorMessage =
  'Пароль должен содержать 8-15 символов с минимум одной цифрой, одной \n' +
  'заглавной и одной строчной буквой, без (#, %, &, !, $, etc.). Обязательно к заполнению.';
const nameErrorMessage =
  'Это поле должно содержать 8-30 знаков, без специальных символов (#, %, &, !, $, etc.) и чисел (0-9). Обязательно к заполнению.';

const SignUp = (props: any) => {
  const dispatch = useAppDispatch();

  const {
    value: name,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    resetValue: nameReset,
  } = useTextInput(isName);
  const {
    value: surname,
    valueIsValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    valueBlurHandler: surnameBlurHandler,
    resetValue: surnameReset,
  } = useTextInput(isName);
  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    resetValue: emailReset,
  } = useTextInput(isEmail);

  const {
    value: phone,
    valueIsValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    resetValue: phoneReset,
  } = useTextInput(isEmail);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    resetValue: passwordReset,
  } = useTextInput(isPassword);

  let formIsValid = false;

  if (nameIsValid && surnameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  //добавить имейл в стор для использования в confirmSignUp

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Не удалось зарегистрироваться',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const updateUserEmail = (email: string) => {
    dispatch(authActions.addEmail(email));
  };

  const submitHandler = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          family_name: surname,
          email,
          phone_number: phone,
          address: JSON.stringify({}),
          'custom:card_number': JSON.stringify({}),
        },
      });
      updateUserEmail(email);
      props.onStateChange('confirmSignUp', {});
      nameReset();
      surnameReset();
      emailReset();
      phoneReset();
      passwordReset();
    } catch (error) {
      showToast();
      console.log(error);
    }
  };

  if (props.authState === 'signUp') {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Регистрация</Text>

        <TextInput
          placeholderTextColor="#C6C6C6"
          style={[styles.textInput, nameHasError && styles.textInputError]}
          placeholder="Имя"
          onChangeText={nameChangeHandler}
          value={name}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <Text style={styles.textInputError}>{nameErrorMessage}</Text>
        )}

        <TextInput
          placeholderTextColor="#C6C6C6"
          style={[styles.textInput, surnameHasError && styles.textInputError]}
          placeholder="Фамилия"
          onChangeText={surnameChangeHandler}
          value={surname}
          onBlur={surnameBlurHandler}
        />
        {surnameHasError && (
          <Text style={styles.textInputError}>{nameErrorMessage}</Text>
        )}
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={[styles.textInput, emailHasError && styles.textInputError]}
          placeholder="Email"
          onChangeText={emailChangeHandler}
          value={email}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <Text style={styles.textInputError}>{emailErrorMessage}</Text>
        )}
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={[styles.textInput, phoneHasError && styles.textInputError]}
          placeholder="Телефон"
          onChangeText={phoneChangeHandler}
          value={phone}
        />
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={[styles.textInput, passwordHasError && styles.textInputError]}
          placeholder="Пароль"
          onChangeText={passwordChangeHandler}
          value={password}
          onBlur={passwordBlurHandler}
          secureTextEntry={true}
        />
        {passwordHasError && (
          <Text style={styles.textInputError}>{passwordErrorMessage}</Text>
        )}

        <View style={styles.additionalButton}>
          <TouchableOpacity onPress={() => props.onStateChange('signIn', {})}>
            <Text style={styles.additionalButtonText}>
              Вернуться, чтобы войти
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.signUpButton,
            !formIsValid && styles.signInButtonDisabled,
          ]}
          disabled={!formIsValid}
          onPress={submitHandler}>
          <Text
            style={[
              styles.signUpButtonText,
              !formIsValid && styles.signUpButtonTextDisabled,
            ]}>
            ЗАРЕГИСТРИРОВАТЬСЯ
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

export default SignUp;
