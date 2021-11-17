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

import {addEmail, addPassword, addUserInfo} from '../store/StoreCard';
import {useDispatch} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const SignUp = (props: any) => {
  const dispatch = useDispatch();
  const handleEmail = (email: any) => {
    dispatch(addEmail(email));
  };
  const handleAddUserInfo = (item: any) => {
    dispatch(addUserInfo(item));
  };
  const handlePassword = (pass: any) => {
    dispatch(addPassword(pass));
  };
  const [state, setState] = useState({
    name: '',
    surName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState({
    name: '',
    surName: '',
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    try {
      const user = await Auth.signUp({
        username: state.email,
        password: state.password,
      });
      props.onStateChange('confirmSignUp', state);
    } catch (error: any) {
      console.log(error);
    }
  };

  if (props.authState === 'signUp') {
    return (
      <View style={styles.Wrapper}>
        <Text style={styles.HeadStyle}>Регистрация</Text>
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Имя"
          onChangeText={val => setState({...state, name: val})}
        />

        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Фамилия"
          onChangeText={val => setState({...state, surName: val})}
        />

        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Емэйл"
          onChangeText={val => setState({...state, email: val.toLowerCase()})}
          value={state.email}
        />
        <Text style={styles.error}>{error.email}</Text>
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Телефон"
          onChangeText={val => setState({...state, phone: val})}
        />
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Пароль"
          onChangeText={val => {
            setState({...state, password: val});
          }}
          secureTextEntry={true}
        />
        <Text style={styles.error}>{error.password}</Text>
        <View style={styles.ButCont}>
          <TouchableOpacity onPress={() => props.onStateChange('signIn', {})}>
            <Text style={styles.SimpText}>back to signIn</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            onSubmit();
            handleEmail(state.email);
            handleAddUserInfo(state);
            handlePassword(state.password);
          }}>
          <Text style={styles.ButText}> ЗАРЕГИСТРИРОВАТЬСЯ</Text>
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
    Bottom: '5%',
    color: 'black',
  },
  ButCont: {
    top: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SimpText: {
    color: 'black',
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
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  error: {
    color: 'red',
    top: '4%',
  },
});

export default SignUp;
