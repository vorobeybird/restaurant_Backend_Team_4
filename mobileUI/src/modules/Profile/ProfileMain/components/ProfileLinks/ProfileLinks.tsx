import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Auth} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {authActions} from '../../../../Auth/store/authStore';
import ScreenNames from '../../../../../navigation/ScreenNames';
import styles from './styles';

type RootStackParamList = {
  navigate: any;
};

const ProfileLinks = () => {
  const navigation = useNavigation<RootStackParamList>();

  const dispatch = useDispatch();
  const handleAddSignInStat = (item: any) => {
    dispatch(authActions.updateAuthStatus(item));
  };

  async function signOut() {
    try {
      await Auth.signOut({global: true});
      handleAddSignInStat(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <View style={styles.LinkWrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ProfileOrders)}
        style={styles.BoxWrapper}>
        <Image
          style={styles.PictStyle}
          source={require('../../../../../../img/myOrders.png')}
        />
        <Text style={styles.TextStyle}>Мои заказы</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ProfileCards)}
        style={styles.BoxWrapper}>
        <Image
          style={styles.PictStyle}
          source={require('../../../../../../img/myCard.png')}
        />
        <Text style={styles.TextStyle}>Мои карты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ProfileAddress)}
        style={styles.BoxWrapper}>
        <Image
          style={styles.PictStyle}
          source={require('../../../../../../img/myAdress.png')}
        />
        <Text style={styles.TextStyle}>Адрес доставки</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()}>
        <View style={styles.BoxWrapper}>
          <Image
            style={styles.PictStyle}
            source={require('../../../../../../img/carbon_logout.png')}
          />
          <Text style={styles.TextStylePol}>Выйти</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileLinks;
