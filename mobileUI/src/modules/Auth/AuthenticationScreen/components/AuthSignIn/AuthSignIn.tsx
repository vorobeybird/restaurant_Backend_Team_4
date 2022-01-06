import React from 'react';
import {Auth} from 'aws-amplify';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

import styles from '../../styles';
import {useAppDispatch} from '../../../../../hooks/hooks';
import {authActions} from '../../../store/authStore';
import useTextInput from '../../../../../hooks/useTextInput';

//убрал имейл хэндлер и диспатч имейла

//for textInput validation
const emailRegExp = new RegExp(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/);
const isEmail = (value: string) => emailRegExp.test(value);
const passwordRegEx = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/);
const isPassword = (value: string) => passwordRegEx.test(value);

/// messages for textInputErrors
const emailErrorMessage =
  'Электронная почта должна быть в формате xxx@yyy.zzz, без специальных символов (#, %, &, !, $, etc.). Обязательно к заполнению.';
const passwordErrorMessage =
  'Пароль должен содержать 8-15 символов с минимум одной цифрой, одной \n' +
  'заглавной и одной строчной буквой, без (#, %, &, !, $, etc.). Обязательно к заполнению.';

const AuthSignIn = (props: any) => {
  const dispatch = useAppDispatch();

  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    resetValue: emailReset,
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

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const updateUserInfo = (item: any) => {
    dispatch(authActions.addUserInfo(item));
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Неправильное имя пользователя или пароль',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const forgotPasswordHandler = () => {
    props.onStateChange('forgotPassword', {});
  };

  const submitHandler = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user, 'amplifyUser');
      updateUserInfo(user);
      emailReset();
      passwordReset();
    } catch (error) {
      console.log('error signing in', error);
      showToast();
    }
  };

  if (props.authState === 'signIn') {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Вход</Text>

        <TextInput
          style={[styles.textInput, emailHasError && styles.textInputError]}
          placeholder="E-mail"
          placeholderTextColor="#C6C6C6"
          onChangeText={emailChangeHandler}
          value={email}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
        )}

        <TextInput
          style={[styles.textInput, passwordHasError && styles.textInputError]}
          placeholder="Пароль"
          placeholderTextColor="#C6C6C6"
          onChangeText={passwordChangeHandler}
          value={password}
          onBlur={passwordBlurHandler}
          secureTextEntry={true}
        />
        {passwordHasError && (
          <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={forgotPasswordHandler}>
          <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => props.onStateChange('signUp', {})}>
          <Text style={styles.forgotPasswordText}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.signInButton,
            !formIsValid && styles.signInButtonDisabled,
          ]}
          disabled={!formIsValid}
          onPress={() => {
            submitHandler();
          }}>
          <Text
            style={[
              styles.signInButtonText,
              !formIsValid && styles.signInButtonTextDisabled,
            ]}>
            {' '}
            ВХОД
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

export default AuthSignIn;
