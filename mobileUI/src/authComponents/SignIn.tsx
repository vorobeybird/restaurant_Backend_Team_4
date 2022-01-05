import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';

import {addEmail, addUserInfo} from '../store/StoreCard';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../store';

const windowWidth = Dimensions.get('window').width;
const SignIn = (props: any) => {
  const cart = useSelector((state: RootState) => state.dishes);
  const dispatch = useDispatch();

  const handleAddUserInfo = (item:any) => {
    dispatch(addUserInfo(item))
}
  const handleEmail = (email: any) => {
    dispatch(addEmail(email));
  };
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    try {
      const user = await Auth.signIn(state.email, state.password);
      console.log(user, 'amplifyUser')
      handleAddUserInfo(user)
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  if (props.authState === 'signIn') {
    return (
      <View style={styles.Wrapper}>
        <Text style={styles.HeadStyle}>Вход</Text>
        <TextInput
          style={styles.street}
          placeholder="E-mail"
          placeholderTextColor="#C6C6C6"
          onChangeText={val => setState({...state, email: val.toLowerCase()})}
          value={state.email}
        />
        <Text style={styles.error}>{error.email}</Text>
        <TextInput
          style={styles.street}
          placeholder="Пароль"
          placeholderTextColor="#C6C6C6"
          onChangeText={val => setState({...state, password: val})}
          secureTextEntry={true}
        />
        <Text style={styles.error}>{error.password}</Text>
        <TouchableOpacity
          style={styles.ForgPassButt}
          onPress={() => props.onStateChange('forgotPassword', {})}>
          <Text style={styles.ForgPass}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SignUpBut}
          onPress={() => props.onStateChange('signUp', {})}>
          <Text style={styles.ForgPass}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            onSubmit();
            handleEmail(state.email);
          }}>
          <Text style={styles.ButText}> ВХОД</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  HeadStyle: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  street: {
    alignSelf: 'center',
    top: '5%',
    width: windowWidth - windowWidth * 0.2,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
    marginBottom: '2%',
    bottom: '5%',
    color: 'black',
  },
  SignUpBut: {
    top: '25%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - windowWidth * 0.2,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#FF4D00',
    borderWidth: 1,
    borderRadius: 4,
  },

  SimpText: {
    color: 'black',
    fontWeight: '500',
  },
  ForgPass: {
    fontWeight: '500',
    color: '#FF4D00',
  },
  ForgPassButt: {
    alignSelf: 'flex-end',
    top: '2%',
  },
  Button: {
    top: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - windowWidth * 0.2,
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  error: {
    color: 'red',
    top: '4%',
  },
});

export default SignIn;
