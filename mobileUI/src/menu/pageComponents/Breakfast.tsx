import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native'
import { Dishes } from './dishes/Dish';
import axios from "axios"

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
export  const  Breakfast = ({  navigation: { goBack } }:{navigation:any}) => {
  
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
          <View style={styles.Title}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.Arrow} source={require('../../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText} >Завтраки</Text>
            
            <Image style={styles.Scope}  source={require('../../../img/scop.png')}/>
            
          </View>
          <FlatList 
            style={styles.Flat}
            data={date}
            renderItem={({ item }) => { 
              const photoArr = item.photos 
              const urlArr =  photoArr.map((item: { photo_url: any; }) => item.photo_url) 
              return (
              <Dishes id={item.id} title={item.title} photos={urlArr} descr={item.default_ingredients} price={item.price} cal={item.calories} weight={item.weight}/>
            )}}
          />
        </View>

  );
};

const styles = StyleSheet.create({

  Scope:{
    left:'250%',
    top:'4.5%',
    width:30,
    height:30,
    justifyContent:'flex-end',
    alignItems:'flex-end'   
  },
  Arrow:{
    top:'26%',
    width:30,
    height:30,
    marginRight:15,
    marginLeft:5,
  },
  Title: {
    flexDirection:'row',
    justifyContent:'flex-start',
    width:'100%',
    height:'10%',
    alignSelf:'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color:'black',
    backgroundColor:'#F4F4F4',
  },
  TitleText:{
    alignSelf:'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color:'black',
  },
  Scroll:{
    paddingBottom:'30%',
    backgroundColor:'white',
  },
  Flat:{
    top:'2%',
  }
});
