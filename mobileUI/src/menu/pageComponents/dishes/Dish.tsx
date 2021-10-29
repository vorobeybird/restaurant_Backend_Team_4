import React from "react";
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';


export const Dishes = ({id, title, photos, descr, price} : {id:any,  title:any, photos:any, descr:any, price: any}) => {

  return (
    <View key={id} style={styles.Wrapper}>
        <Text style={styles.Header}>{title}</Text>
        <ScrollView pagingEnabled horizontal style={styles.Pict}>
          {
            photos.map((image: any, index: any) => {return (
              <Image key={index} style={styles.Pict} source={{uri:image}}/>
            )
            })
          }
          
        </ScrollView>
        <View style={styles.BotText}>
            <Text style={styles.Descr}>Калорийность: {descr} калорий</Text>
            <Text style={styles.Cost}>Цена: {price}BYN</Text>
        </View>
    </View>
  )
};

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
      
    }
  });