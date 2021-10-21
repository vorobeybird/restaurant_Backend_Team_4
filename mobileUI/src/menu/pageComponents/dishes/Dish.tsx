import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';



export const Dishes = ({ img, title, descr, price} : {img:any, title:any, descr:any, price: any}) => {
  
  return (
    <View style={styles.Wrapper}>
        <Text style={styles.Header}>{title}</Text>
        <Image style={styles.Pict} source={img}/>
        <View style={styles.BotText}>
            <Text style={styles.Descr}>{descr} </Text>
            <Text style={styles.Cost}>{price}</Text>
        </View>
    </View>
)
};

const styles = StyleSheet.create({

    Header:{
      bottom:15,
      fontFamily: 'Open Sans',
      fontSize: 20,
      fontWeight: 'bold',
      color:'black'
    },
    Pict:{
      width:250,
      height:170,
      backgroundColor:'white'
    },
    BotText: {
      top:20,
      width:250,
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'space-between',
    },
    Descr:{
      alignSelf:'flex-start',
      color:'black',
    },
    Wrapper:{
      top:'1%',
      alignItems: 'center',
      paddingBottom:'14%'
      
    },
    Cost:{
      left:20,
      color:'black',
    }
  });