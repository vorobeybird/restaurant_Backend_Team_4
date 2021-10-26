import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../Menu';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Dish } from './dishes/Dish';

export const WeekCatch = () => {
  const navigation = useNavigation<RootStackParamList>();


  return (
    <View>
          <Text style={styles.Title} >Завтраки</Text>
          
    </View>
  );
};

const styles = StyleSheet.create({
  
  Title: {
    
    alignSelf:'center',
    fontFamily: 'Open Sans',
    fontSize: 30,
    fontWeight: 'bold',
    color:'black'
  },
});