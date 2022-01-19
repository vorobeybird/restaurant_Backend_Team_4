import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../navigation/ScreenNames';
import styles from './styles';
import {useAppDispatch} from '../../hooks/hooks';
import {cartActions} from '../Cart/store/cartStore';

type RootStackParamList = {
  MenuNavigator: undefined;
  CartMain: undefined;
  ProfileNavigator: undefined;
  navigate: any;
};

const Home = () => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.MainWrapper}>
      <View style={styles.Title}>
        <Text style={styles.TitleText}> Ocean Bar </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.MenuNavigator)}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../../img/menuCard.png')}
        />
        <Text style={styles.TextStyle}>МЕНЮ</Text>
        <Image
          style={styles.rightPict}
          source={require('../../../img/arrOrange.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(cartActions.clearCart());
          navigation.navigate(ScreenNames.CartNavigator, {
            screen: 'OrderTableConfirm',
          });
        }}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../../img/tableHome.png')}
        />
        <View style={styles.simpWrapper}>
          <Text style={styles.TextStyle}>ЗАБРОНИРОВАТЬ</Text>
          <Text style={styles.TextStyle}>СТОЛ</Text>
        </View>
        <Image
          style={styles.rightPict}
          source={require('../../../img/arrOrange.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ProfileNavigator)}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../../img/profHome.png')}
        />
        <Text style={styles.TextStyle}>ПРОФИЛЬ</Text>
        <Image
          style={styles.rightPict}
          source={require('../../../img/arrOrange.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
