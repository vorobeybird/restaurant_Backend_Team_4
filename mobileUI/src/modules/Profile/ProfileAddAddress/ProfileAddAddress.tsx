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
import {addAddress} from '../../../store/StoreCard';
import styles from './styles';

interface IAddress {
  str: string;
  house: string;
  corp: string;
  kv: string;
  id: number;
}

const ProfileAddAddress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [adress, setAdress] = useState<IAddress>({
    str: '',
    house: '',
    corp: '',
    kv: '',
    id: 1,
  });
  const dispatch = useDispatch();
  const handleProfileAddAddress = (address: IAddress) => {
    dispatch(addAddress(address));
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
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> Доставка</Text>
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
            handleProfileAddAddress(adress);
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

export default ProfileAddAddress;
