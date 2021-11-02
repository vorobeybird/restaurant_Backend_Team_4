import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button} from 'react-native';
import {addToCard} from '../store/StoreCard'
import { useDispatch, useSelector } from "react-redux";
import dishSlice from "../store/StoreCard";


export const DishPage = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
  const id = route.params.names[0]
  const title = route.params.names[1]
  const photos = route.params.names[2]
  const descr = route.params.names[3]
  const price = route.params.names[4]
  const cal = route.params.names[5]
  const weight = route.params.names[6]
  const item = {
    id:id,
    title:title,
    photos:photos,
    price:price,
  }

  const dispatch = useDispatch()
  
  const handleAddToCard = (item:any) => {
    dispatch(addToCard(item))
  }
    return (

      <View key={id} style={styles.Wrapper}>
        <View style={styles.GoBackWrapper}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.Header}>{title}</Text>
        </View>
        <ScrollView pagingEnabled horizontal style={styles.Pict}>
          {
            photos.map((image: any, index: any) => {return (
              <Image key={index} style={styles.Pict} source={{uri:image}}/>
             )
            })
          }
        </ScrollView>
        <View style={styles.BotText}>
            <Text style={styles.Descr}>Калорийность: {cal} калорий</Text>
            <Text style={styles.Cost}>Цена: {price}BYN</Text>
            <Text style={styles.Descr}>Состав: {descr}</Text>
            <Text style={styles.Descr}>Вес: {weight} грамм</Text>
        </View>
        <View style={styles.ButtonWrapper}>
          <Button
            onPress={ ()=> {handleAddToCard(item)} }
            title="Добавить в корзину"
            color="#841584"
          />
        </View>
      </View>
        
    )
}

const styles = StyleSheet.create({
    Header:{
    
      bottom:'2%',
      fontFamily: 'Open Sans',
      fontSize: 20,
      fontWeight: 'bold',
      color:'black'
    },
    Pict:{
      resizeMode:'contain',
      width:250,
      height:170,
      backgroundColor:'white'
    },
    BotText: {
      top:20,
      width:250,
      flexDirection:'column',
    },
    Descr:{
      textAlign:'left',
      color:'black',
    },
    Wrapper:{
      top:'1%',
      alignItems: 'center',
      paddingBottom:'14%'
      
    },
    Cost:{
      textAlign:'left',
      color:'black',
      
    },
    Arrow:{
        bottom:6,
        width:30,
        height:30
    },
    GoBackWrapper:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    ButtonWrapper:{
        top:'20%'
    },
    Text:{
        color:'black'
    }
  });