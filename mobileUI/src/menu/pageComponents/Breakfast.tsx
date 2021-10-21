import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../Menu';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput } from 'react-native'
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
}
interface Response {

  
  data: MenuItem[]
  status: number
}
export  const  Breakfast = async () => {
  const [data, setData] = useState({} as any);

  const getItems = async () => {
    const response = await axios.get('http://ec2-18-185-80-4.eu-central-1.compute.amazonaws.com:5000/api/dish') as AxiosResponse<Response>
    return JSON.parse(JSON.stringify(response)).data[0]
  }
  const fetchMenuItems =  () => async () => {

    const items = await getItems()
  
    
    setData(items.data)
  }
  fetchMenuItems()

    

  return (
      <View>
        <ScrollView style={styles.Scroll}>
          <Text style={styles.Title}>Завтраки</Text>
          <Dishes   img={undefined} title={data.title} descr={data.descr} price={data.price} />
        </ScrollView>
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
  Scroll:{
    paddingBottom:'30%'
  }
});