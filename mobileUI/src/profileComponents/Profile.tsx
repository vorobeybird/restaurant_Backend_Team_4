import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const Profile = () => {

  return (
    <View style={styles.MainCont}>
   
        <Image style={styles.Pict} source={require('../../img/profPhoto.png')}/>
        <View style={styles.Conts}>
          <Text style={styles.TextStyle}>Фамилия Имя</Text>
          <Text style={styles.TextStyle}>Электронная почта</Text>
          <Text style={styles.TextStyle}>+375(29)000-00-00</Text>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({
    MainCont: {
      position:'relative',
      display:'flex',
      flexDirection:'row',
      alignSelf:'center',
      top:'25%',
    },
    Pict: {
      width:'20%',
      height:'160%'
    },
    Conts: {
      justifyContent: 'space-around',
      marginStart:10,
    },
    TextStyle:{
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 15,
      color: '#000000',
  },
});

export default Profile;
