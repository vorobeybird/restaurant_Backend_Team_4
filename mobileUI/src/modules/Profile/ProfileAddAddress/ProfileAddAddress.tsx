import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {authActions, IAddressDetails} from '../../Auth/store/authStore';
import {useAppDispatch} from '../../../hooks/hooks';
import styles from './styles';

const ProfileAddAddress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [address, setAddress] = useState<IAddressDetails>({
    str: '',
    house: '',
    corp: '',
    kv: '',
    id: 1,
  });
  const dispatch = useAppDispatch();

  const handleProfileAddAddress = (address: IAddressDetails) => {
    dispatch(authActions.addAddress(address));
  };
  const nameRegEx = new RegExp('^([а-яА-Я]{2,30})');
  const [error, setError] = useState({
    street: '',
    home: '',
  });
  const required = () => {
    let streetErr, homeErr;
    if (!address.str) {
      streetErr = 'Введите название улицы';
    } else if (nameRegEx.test(address.str) === false) {
      streetErr = 'Введите название улицы';
    } else {
      streetErr = '';
    }
    if (!address.house) {
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
          onChangeText={val => setAddress({...address, str: val})}
        />
        <Text style={styles.errorStreet}>{error.street}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.home}
            placeholder="*Дом"
            onChangeText={val => setAddress({...address, house: val})}
          />

          <TextInput
            style={styles.home}
            placeholder="Корпус"
            onChangeText={val => setAddress({...address, corp: val})}
          />
          <TextInput
            style={styles.home}
            placeholder="Квартира"
            onChangeText={val => setAddress({...address, kv: val})}
          />
        </View>
        <Text style={styles.errorHome}>{error.home}</Text>
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (
            address.str != '' &&
            address.house != '' &&
            nameRegEx.test(address.str) === true
          ) {
            handleProfileAddAddress(address);
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
