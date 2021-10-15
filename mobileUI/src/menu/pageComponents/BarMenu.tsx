import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../Menu';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import {Dish} from './dishes/Dish';

export const BarMenu = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [dishesList, setDishesList] = useState([
    {id: 1, name: 'Название блюда'},
    {id: 2, name: 'Название блюда'},
    {id: 3, name: 'Название блюда'},
    {id: 4, name: 'Название блюда'},
    {id: 5, name: 'Название блюда'},
    {id: 6, name: 'Название блюда'},
    {id: 7, name: 'Название блюда'},
  ]);

  return (
    <View style={styles.FullContainer}>
      <View style={styles.Header}>
        <View style={styles.SearchContainer}></View>
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderBtn} onTouchStart={() => { navigation.navigate('Menu') }}>
            <Image source={require('../../../img/arrow-left.png')}
              style={styles.HeaderBtn__img}
            ></Image>
          </View>
          <Text style={styles.Title} >Меню бара</Text>
        </View>
      </View>
      <FlatList style={styles.ContentContainer} data={dishesList} renderItem={({ item }) => (
        <Dish el={item} />
      )} />
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
    width: '10%',
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
    width: '90%',
  },
});