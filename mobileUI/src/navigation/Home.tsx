import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../store/StoreCard';

type RootStackParamList = {
  MenuTabNavigation: undefined;
  MarketMain: undefined;
  ProfileNavigation: undefined;
  navigate: any;
};
export const Home = () => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useDispatch();
  return (
    <View style={styles.MainWrapper}>
      <View style={styles.Title}>
        <Text style={styles.TitleText}> Ocean Bar </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuTabNavigation',{screen:'Menu'})}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../img/menuCard.png')}
        />
        <Text style={styles.TextStyle}>МЕНЮ</Text>
        <Image
          style={styles.rightPict}
          source={require('../../img/arrOrange.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearCart());
          navigation.navigate('MarketTabNavigation', {
            screen: 'ConfirmOrderTable',
          });
        }}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../img/tableHome.png')}
        />
        <View style={styles.simpWrapper}>
          <Text style={styles.TextStyle}>ЗАБРОНИРОВАТЬ</Text>
          <Text style={styles.TextStyle}>СТОЛ</Text>
        </View>
        <Image
          style={styles.rightPict}
          source={require('../../img/arrOrange.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileNavigation')}
        style={styles.contenWrapper}>
        <Image
          style={styles.leftPict}
          source={require('../../img/profHome.png')}
        />
        <Text style={styles.TextStyle}>ПРОФИЛЬ</Text>
        <Image
          style={styles.rightPict}
          source={require('../../img/arrOrange.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contenWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 87,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
  },
  Title: {
    flexDirection: 'row',
    height: '9%',
    width: '100%',

    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  TextStyle: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  leftPict: {
    left: 30,
  },
  rightPict: {
    right: 30,
  },
  simpWrapper: {
    alignItems: 'center',
  },
});
