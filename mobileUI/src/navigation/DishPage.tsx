import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid} from 'react-native';
import {addToCard} from '../store/StoreCard'
import { useDispatch } from "react-redux";
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
  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Блюдо добавлено в корзину",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
  };
    return (

      <View key={id} style={styles.Wrapper}>
        <View style={styles.Title}>
          <TouchableOpacity onPress={() => goBack()}>
              <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
          </TouchableOpacity>
          <Text style={styles.TitleText} >{title}</Text>
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
            <Text style={styles.Sostav}>Состав:</Text>
            
            {
            descr.split(", ").map((item: any, index: any) => {return (
              <View style={styles.list}>
                <Image style={styles.listPict} source={require('../../img/circle.png')}/>
                <Text key={index} style={styles.SostItem}>{item}</Text>
              </View>
              
             )
            })
          }    
            
        </View>
        <View style={styles.calWrapper}>
          <Image source={require('../../img/fire.png')}/>
          <Text style={styles.textCalWraper}>  {cal}  Ккал</Text>
        </View>
        <View style={{
          left:'10%',
          top:'10%',
          width:'80%',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: 1,
          borderColor:'#C4C4C4',

        }}>
      </View>
      <View style={styles.ButtonWrapper}>
        <TouchableOpacity onPress={ ()=> {handleAddToCard(item); showToast()} }>
          <Text style={styles.ButtText}> ДОБАВИТЬ В КОРЗИНУ</Text>
        </TouchableOpacity>
      </View>
        
    </View>
        
    )
}

const styles = StyleSheet.create({
  list:{
    flexDirection:'row',
  },
  listPict:{
    marginRight:10,
    alignSelf:'center',
  },
  SostItem:{
    color: '#000000',
  },
  Sostav:{
    color: '#000000',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
  },
  Arrow:{
    top:'26%',
    width:30,
    height:30,
    marginRight:15,
    marginLeft:5,
  },
  TitleText:{
    alignSelf:'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color:'black',
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
    Header:{
    
      bottom:'2%',
      fontFamily: 'Open Sans',
      fontSize: 20,
      fontWeight: 'bold',
      color:'black'
    },
    Pict:{
      top:'1%',
      alignSelf: 'center',
      resizeMode:'contain',
      width:325,
      height:265,
      backgroundColor:'white',
      borderRadius: 8,
    },
    BotText: {
      top:'5%',
      left:'10%',
      flexDirection:'column',
    },
    Descr:{
      textAlign:'left',
      color:'black',
    },
    Wrapper:{
      flex:1,
      paddingBottom:'50%',
      backgroundColor:'white'
    },
    Cost:{
      textAlign:'left',
      color:'black',
      
    },
    GoBackWrapper:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    ButtonWrapper:{
      alignItems:'center',
      justifyContent:'center',
      top:'20%',
      height:'12%',
      width:'80%',
      alignSelf:'center',
      backgroundColor:'#FF4D00',
      borderRadius: 4,
    },
    ButtText:{
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      color:'white',
    },
    Text:{
        color:'black'
    },
    calWrapper:{
      left:'8%',
      top:'10%',
      flexDirection:'row',
    },
    textCalWraper:{
      color:'black',
    }
  });