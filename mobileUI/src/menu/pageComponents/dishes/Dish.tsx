import React from "react";
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
  DishPageNavigation: undefined;
  DishPage: undefined;
  navigate: any;
};


export const Dishes = ({id, title, photos, descr, price, cal, weight} : {id:any,  title:any, photos:any, descr:any, price: any,cal:any, weight:any}) => {
  const navigation = useNavigation<RootStackParamList>();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DishPage', {id,title, photos, descr, price, cal, weight})}>
      <View key={id} style={styles.Wrapper}>
        
        <ScrollView pagingEnabled horizontal style={styles.Pict}>
          {
            photos.map((image: any, index: any) => {return (
              <Image key={index} style={styles.Pict} source={{uri:image}}/>
             )
            })
          }    
        </ScrollView>
        <View style={styles.BotText}>
            <Text style={styles.Header}>{title}</Text>
            <View style={styles.btCont}>
              <Text style={styles.Cost}>{price} <Text style={styles.Header}>BYN</Text></Text>
              <Text style={styles.Descr}> {weight} г</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    btCont:{
      top:'4%',
      justifyContent:'space-between',
      flexDirection:'row',
    },
    Header:{
      fontFamily:'Roboto',
      lineHeight:20,
      bottom:'2%',
      fontSize:18,
      color:'black'
    },
    Pict:{
      borderRadius: 8,
      resizeMode:'contain',
      width:324,
      height:200,
      
    },
    BotText: {
      top:20,
      width:300,
      flexDirection:'column',
    },
    Descr:{
      textAlign:'left',
      color:'#939393',
    },
    Wrapper:{
      top:'1%',
      alignItems: 'center',
      paddingBottom:'16%'
      
    },
    Cost:{
      fontSize: 20,
      fontWeight: 'bold',
      color:'black',
      textAlign:'left',
      
      
    }
  });