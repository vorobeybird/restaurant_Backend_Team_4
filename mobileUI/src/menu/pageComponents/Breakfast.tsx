import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../Menu';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Dishes } from './dishes/Dish';
import axios, { AxiosResponse } from "axios"

interface MenuItem {
  title: string;
  default_ingredients: string;
  ingredients: number[];
  price: number;
  weight: number;
  categories: number[];
  calories: number;
  photo: string;
  data:any;
}
export  const  Breakfast = () => {
  const [date, setDate] = useState({} as any);
  

  const getItems = async () => {
    const response = await axios.get<MenuItem[]>('http://18.192.61.153:5000/api/dish')
    const res = response.data
    return res.data
  }
  const fetchMenuItems = async () => {
    const items = await getItems()
    setDate(items)
    
  }

  
  useEffect(() => {
    fetchMenuItems()
    
  },[])
  
  return (
      
        <View style={styles.Scroll}>
          <Text style={styles.Title}>Завтраки</Text>
          <FlatList 
            style={styles.Flat}
            data={date}
            renderItem={({ item }) => { 
              const photoArr = item.photos 
              const urlArr =  photoArr.map((item: { photo_url: any; }) => item.photo_url) 
              return (
              <Dishes id={item.id} title={item.title} photos={urlArr} descr={item.default_ingredients} price={item.price}/>
            )}}
          />
        </View>

  );
};

const styles = StyleSheet.create({
  Title: {
    height:'7%',
    alignSelf:'center',
    fontFamily: 'Open Sans',
    fontSize: 30,
    fontWeight: 'bold',
    color:'black'
  },
  Scroll:{
    paddingBottom:'30%'
  },
  Flat:{
    top:'2%',
  }
});
