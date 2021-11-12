import React from 'react';
import {
  StyleSheet,
  Text,
  View,Image, TouchableOpacity,
} from 'react-native'
import { Auth } from 'aws-amplify'
import {Authenticator, SignOut} from 'aws-amplify-react-native'
import { useDispatch, useSelector } from "react-redux";
import { addSignInStat } from '../store/StoreCard' 
export const Links = () => {
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
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/alarms.png')}/>
        <Text style={styles.TextStyle}>Уведомления</Text>
      </View>
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/cards.png')}/>
        <Text style={styles.TextStyle}>Карты</Text>
      </View>
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/adress.png')}/>
        <Text style={styles.TextStyle}>Адреса</Text>
      </View>
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/options.png')}/>
        <Text style={styles.TextStyle}>Настройки аккаунта</Text>
      </View>
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/confPoly.png')}/>
        <Text style={styles.TextStylePol}>Политика</Text>
      </View>
      <Text style={styles.TextStyle}>        конфиденциальности</Text>
      <TouchableOpacity onPress={()=>signOut()}>
        <View style={styles.BoxWrapper}>
          <Image style={styles.PictStyle}  source={require('../../img/logOut.png')}/>
          <Text style={styles.TextStylePol}>Выйти</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    LinkWrapper:{
        display:'flex',
        position:'relative',
        alignSelf: 'center',
        justifyContent:'space-between',
        top:'30%'
    },
    TextStyle:{
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 22,
        lineHeight: 26,
        paddingBottom:15,
        color: '#000000',
    },
    TextStylePol:{
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 22,
        lineHeight: 26,
        color: '#000000',
    },
    BoxWrapper:{
      flexDirection:'row'
    },
    PictStyle:{
      width:30,
      height:30,
      marginRight:'5%',
    },
    

  
});


