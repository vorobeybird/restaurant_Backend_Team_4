import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addAddress} from '../store/StoreCard';
type RootStackParamList = {
  ConfirmOrder: undefined;
  navigate: any;
};

export const AddAdress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [adress, setAdress] = useState({
    str: '',
    house: '',
    corp: '',
    kv: '',
    id: 1,
  });
  const dispatch = useDispatch();
  const handleAddAdress = item => {
    dispatch(addAddress(item));
  };
  const nameRegEx = new RegExp('^([а-яА-Я]{2,30})');
  const [error, setError] = useState({
    street: '',
    home: '',
  });
  const required = () => {
    let streetErr, homeErr;
    if (!adress.str) {
      streetErr = 'Введите название улицы';
    } else if (nameRegEx.test(adress.str) === false) {
      streetErr = 'Введите название улицы';
    } else {
      streetErr = '';
    }
    if (!adress.house) {
      homeErr = 'Введите номер дома';
    } else {
      homeErr = '';
    }
    setError({street: streetErr, home: homeErr});
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Адрес добавлен',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> Добавить адрес доставки</Text>
      </View>
      <View style={styles.HeadWrap}>
        <Text style={styles.Header}> Добавить адрес доставки </Text>
      </View>
      <View style={styles.mainWrapper}>
        <TextInput
          style={styles.street}
          placeholder="*Улица"
          onChangeText={val => setAdress({...adress, str: val})}
        />
        <Text style={styles.errorStreet}>{error.street}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.home}
            placeholder="*Дом"
            onChangeText={val => setAdress({...adress, house: val})}
          />

          <TextInput
            style={styles.home}
            placeholder="Корпус"
            onChangeText={val => setAdress({...adress, corp: val})}
          />
          <TextInput
            style={styles.home}
            placeholder="Квартира"
            onChangeText={val => setAdress({...adress, kv: val})}
          />
        </View>
        <Text style={styles.errorHome}>{error.home}</Text>
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (
            adress.str != '' &&
            adress.house != '' &&
            nameRegEx.test(adress.str) === true
          ) {
            handleAddAdress(adress);
            goBack();
            showToast();
          } else {
            required();
          }
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadWrap: {
    top: '7%',
  },
  Header: {
    alignSelf: 'center',

    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  Wrapper: {
    flex: 1,

    paddingBottom: '14%',
    backgroundColor: 'white',
  },
  Arrow: {
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  Title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '13%',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#ffffff',
  },
  mainWrapper: {
    top: '10%',
    flexDirection: 'column',
  },
  street: {
    alignSelf: 'center',
    top: '10%',
    width: '80%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
  },
  errorStreet: {
    top: 20,
    left: 40,
    color: 'red',
  },
  errorHome: {
    top: 50,
    left: 40,
    color: 'red',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  home: {
    top: '10%',
    width: '20%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
  },
  Button: {
    top: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 50,
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
});
