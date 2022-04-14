import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useState} from 'react';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
type RootStackParamList = {
  OrderConfirmation: undefined;
  navigate: any;
};

const OrderAddress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const cart = useAppSelector(state => state.dishes);
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackParamList>();
  const [street, setStreet] = useState('');
  const [home, setHome] = useState('');
  const [corp, setCorp] = useState('');
  const [dep, setDep] = useState('');
  const [error, setError] = useState({
    street: '',
    home: '',
    corp: '',
  });

  const nameRegEx = new RegExp('^([а-яА-Я]{2,30})');
  const required = () => {
    let streetErr, homeErr;
    if (!street) {
      streetErr = 'Введите название улицы';
    } else if (nameRegEx.test(street) === false) {
      streetErr = 'Введите название улицы';
    } else {
      streetErr = '';
    }
    if (!home) {
      homeErr = 'Введите номер дома';
    } else {
      homeErr = '';
    }
    setError({street: streetErr, home: homeErr});
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Введите необходимые поля',
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
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> Доставка</Text>
      </View>
      <View style={styles.HeadWrap}>
        <Text style={styles.Header}> Выберите адрес доставки</Text>
      </View>
      <View style={styles.mainWrapper}>
        <TextInput
          style={styles.street}
          placeholder="*Улица"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          onChangeText={val => setStreet(val)}
        />
        <Text style={styles.errorStreet}>{error.street}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.home}
            placeholder="*Дом"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={val => setHome(val)}
          />

          <TextInput
            style={styles.home}
            placeholder="Корпус"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={val => setCorp(val)}
          />
          <TextInput
            style={styles.home}
            placeholder="Квартира"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            onChangeText={val => setDep(val)}
          />
        </View>
        <Text style={styles.errorHome}>{error.home}</Text>
      </View>
      <Text style={styles.prgressText}> шаг 3/3</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (street != '' && home != '' && nameRegEx.test(street) === true) {
            navigation.navigate(ScreenNames.OrderPayment);
          } else {
            required();
            return showToast();
          }
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderAddress;
