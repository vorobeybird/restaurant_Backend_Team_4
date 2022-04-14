import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {store} from './store';

import {useAppSelector} from './hooks/hooks';
import AppNavigator from './navigation/AppNavigator';
import AuthenticationScreen from './modules/Auth/AuthenticationScreen';

const ShowContent = () => {
  const authState = useAppSelector(state => state.auth);
  console.log(authState.isSignedIn, 'SignIn message');

  return (
    <>
      {authState.isSignedIn === 'signedIn' ? (
        <AppNavigator />
      ) : (
        <AuthenticationScreen />
      )}
    </>
  );
};

const Index = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShowContent />
      </PersistGate>
    </Provider>
  );
};

export default Index;
