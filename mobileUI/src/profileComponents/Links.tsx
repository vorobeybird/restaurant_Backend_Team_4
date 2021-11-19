import React from 'react';
import {
  StyleSheet,
  Text,
  View,Image, TouchableOpacity,
} from 'react-native'
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from "react-redux";
import { addSignInStat } from '../store/StoreCard' 
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
    
  navigate:any;
}


export const Links = () => {
  const navigation = useNavigation<RootStackParamList>();

  const dispatch = useDispatch()
  const handleAddSignInStat = (item:any) => {
    dispatch(addSignInStat(item))
  }

  async function signOut() {
    try {
        await Auth.signOut({ global: true });
        handleAddSignInStat(false)
        
    } catch (error) {
        console.log('error signing out: ', error);
    }

  }
  return (
    <View style={styles.LinkWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('MyOrders')} style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/myOrders.png')}/>
        <Text style={styles.TextStyle}>Мои заказы</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCards')} style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/myCard.png')}/>
        <Text style={styles.TextStyle}>Мои карты</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyAdress')} style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/myAdress.png')}/>
        <Text style={styles.TextStyle}>Адрес доставки</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyConfPol')} style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/policy.png')}/>
        <Text style={styles.TextStylePol}>Политика конфиденциальности</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>signOut()}>
        <View style={styles.BoxWrapper}>
          <Image style={styles.PictStyle}  source={require('../../img/carbon_logout.png')}/>
          <Text style={styles.TextStylePol}>Выйти</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    LinkWrapper:{
        alignSelf: 'center',
        justifyContent:'space-evenly',
        top:'10%'

    },
    TextStyle:{
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 25,
        
        color: '#000000',
    },
    TextStylePol:{
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 25,
        color: '#000000',
    },
    BoxWrapper:{
      marginBottom:'5%',
      flexDirection:'row',
    },
    PictStyle:{
      width:22,
      height:22,
      marginRight:'5%',
      marginLeft:'5%',
    },
    

  
});


