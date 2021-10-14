import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList} from '../Menu';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export const Breakfast = () => {
  const navigation = useNavigation<RootStackParamList>();

  const getDishes = () => {
    const dishes = [];
    for(let i = 0; i < 20; i++) {
      dishes.push(
        <View key={i} style={styles.Dish}>
          <Text>Название блюда</Text>
          <Image source={require('../../../img/dishImg.png')}></Image>
        </View>
      );
    }
    return dishes;
  }

  return (
    <View style={styles.FullContainer}>
      <View style={styles.Header}>
        <View style={styles.SearchContainer}></View>
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderBtn} onTouchStart={()=> {navigation.navigate('Menu')}}> 
            <Image source={require('../../../img/arrow-left.png')}
             style={styles.HeaderBtn__img}
             ></Image>
          </View>
          <Text style={styles.Title} >Breakfast</Text>
        </View>
      </View>
      <View style={styles.ContentContainer}>
      {getDishes()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FullContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  Header: {
    display: 'flex',
    flexDirection: 'column',
    height: '15%'
  },
  SearchContainer: {
    height: '30%'
  },
  HeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderBtn: {
    height: '80%',
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderBtn__img: {
    height: '50%',
    width: '50%',
  },
  Title: {
    fontFamily: 'Open Sans',
    fontSize: 30,
    fontWeight: 'bold',
  },
  ContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center',
    
  },
  Dish: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  }
});

