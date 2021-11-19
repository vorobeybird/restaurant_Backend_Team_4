import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid} from 'react-native';

import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
    
    navigate:any;
  }


export const MyConfPol = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
 
    return (
      <View style={styles.Wrapper}>
          <View style={styles.Title}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText}>Политика конфиденциальности</Text>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    Wrapper:{
        flex:1,
        backgroundColor:'white',
    },
    Title: {
        flexDirection:'row',
        height:'9%',
        width:'100%',
        
        
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 'normal',
        color:'black',
        backgroundColor:'#F4F4F4',
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
        fontSize: 22,
        fontWeight: 'normal',
        color:'black',
    },
})
