import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../store/StoreCard';
import ScreenNames from '../../navigation/ScreenNames';
import styles from './styles';

type RootStackParamList = {
  MenuNavigator: undefined;
  CartMain: undefined;
  ProfileNavigator: undefined;
  navigate: any;
};

const Home = () => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useDispatch();
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
          dispatch(clearCart());
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
