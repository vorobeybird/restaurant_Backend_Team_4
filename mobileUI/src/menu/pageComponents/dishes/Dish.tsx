import React from "react";
import { StyleSheet, View, Text, Image} from 'react-native';

export const Dishes = ({id, title, photos, descr, price} : {id:any,  title:any, photos:any, descr:any, price: any}) => {
  
  return (
    <View key={id} style={styles.Wrapper}>
        <Text style={styles.Header}>{title}</Text>
        <Image style={styles.Pict} source={{uri:photos}}/>
        <View style={styles.BotText}>
            <Text style={styles.Descr}> {descr} </Text>
            <Text style={styles.Cost}>{price}</Text>
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