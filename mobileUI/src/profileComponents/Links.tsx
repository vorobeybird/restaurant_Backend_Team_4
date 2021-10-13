import React from 'react';
import {
  StyleSheet,
  Text,
  View,Image,
} from 'react-native'


export const Links = () => {

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
      <View style={styles.BoxWrapper}>
        <Image style={styles.PictStyle}  source={require('../../img/logOut.png')}/>
        <Text style={styles.TextStyle}>Выйти</Text>
      </View>
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
    }

  
});


