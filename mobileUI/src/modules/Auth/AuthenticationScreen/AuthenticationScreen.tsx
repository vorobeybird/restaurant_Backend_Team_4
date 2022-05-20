import React from 'react';
import {
  Authenticator,
  ConfirmSignIn,
  ForgotPassword,
} from 'aws-amplify-react-native';
import Amplify from '@aws-amplify/core';
import AuthSignIn from './components/AuthSignIn';
import AuthSignUp from './components/AuthSignUp';
import AuthConfirmSignUp from './components/AuthConfirmSignUp/AuthConfirmSignUp';
import {useAppDispatch} from '../../../hooks/hooks';
import {authActions} from '../store/authStore';

import awsconfig from '../../../../aws-exports';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const AuthenticationScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <Authenticator
      usernameAttributes="email"
      authState="signIn"
      hideDefault={true}
      onStateChange={(authState: any) => {
        console.log('...authState', authState);
        dispatch(authActions.updateAuthStatus(authState));
      }}>
      <AuthSignUp />
      <AuthSignIn />
      <AuthConfirmSignUp />
      <ConfirmSignIn />
      <ForgotPassword />
    </Authenticator>
  );
};

export default AuthenticationScreen;
