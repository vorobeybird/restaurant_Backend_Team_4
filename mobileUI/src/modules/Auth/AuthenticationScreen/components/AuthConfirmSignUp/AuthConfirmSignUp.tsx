import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useAppSelector} from '../../../../../hooks/hooks';
import styles from '../../styles';
import useTextInput from '../../../../../hooks/useTextInput';

const confirmationCodeRegEX = new RegExp(/\d{3}$/);
const isCode = (value: string) => confirmationCodeRegEX.test(value);

const AuthConfirmSignUp = (props: any) => {
  const authState = useAppSelector(state => state.auth);

  const {
    value: code,
    valueIsValid: codeIsValid,
    hasError: codeHasError,
    valueChangeHandler: codeChangeHandler,
    valueBlurHandler: codeBlurHandler,
    resetValue: codeReset,
  } = useTextInput(isCode);

  const signInOnSub = async () => {
    try {
      const user = await Auth.signIn(authState.email, authState.password);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    try {
      const data = await Auth.confirmSignUp(authState.email, code);
      if (data === 'SUCCESS') {
        signInOnSub();
      }
      props.onStateChange('signedIn', {});
    } catch (error) {
      console.log(error, 'error');
    }
  };

  if (props.authState === 'confirmSignUp') {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Подтвердить код</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Код подтверждения"
          onChangeText={codeChangeHandler}
          value={code}
          onBlur={codeBlurHandler}
        />

        <View style={styles.additionalButton}>
          <TouchableOpacity onPress={() => props.onStateChange('signIn', {})}>
            <Text style={styles.additionalButtonText}>
              Вернуться, чтобы войти
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.onStateChange('signUp', {})}>
            <Text style={styles.additionalButtonText}>
              Вернуться к регистрации
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            submitHandler();
            signInOnSub();
          }}>
          <Text style={styles.signUpButton}> ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

export default AuthConfirmSignUp;
