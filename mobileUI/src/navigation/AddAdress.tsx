import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Touchable, TextInput, ToastAndroid} from 'react-native';
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { addAddress } from "../store/StoreCard";
type RootStackParamList = {
    ConfirmOrder: undefined;
    navigate:any;
  }


export const AddAdress = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const [adress, setAdress] = useState({str:'',house:'',corp:'',kv:'',id:1})
    const dispatch = useDispatch()
    const handleAddAdress = (item) => {
        dispatch(addAddress(item))
    }
    const showToast = () => {
        ToastAndroid.showWithGravity(
          "Адрес добавлен",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
                </TouchableOpacity>
                <Text style={styles.TitleText}> Доставка</Text>
            </View>
            <View style={styles.HeadWrap}>
                <Text style={styles.Header}> Добавить адрес доставки </Text>
            </View>
            <View style={styles.mainWrapper}>
                <TextInput 
                    style={styles.street}
                    placeholder='*Улица'
                    onChangeText={(val)=> setAdress({...adress,str:val, })}
                    
                />
                <View style={styles.container}>
                    <TextInput 
                        style={styles.home}
                        placeholder='*Дом'
                        onChangeText={(val)=> setAdress({...adress,house:val})}
                    />
                    <TextInput 
                        style={styles.home}
                        placeholder='Корпус'
                        onChangeText={(val)=> setAdress({...adress,corp:val})}
                    />
                    <TextInput 
                        style={styles.home}
                        placeholder='Квартира'
                        onChangeText={(val)=> setAdress({...adress,kv:val})}
                    />
                </View>
            </View>
            
            <TouchableOpacity style={styles.Button} onPress={() => {handleAddAdress(adress);goBack(); showToast()}}>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    HeadWrap:{
        top:'7%',
    },
    Header: {
        alignSelf:'center',
        
        fontFamily:'Roboto',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        lineHeight:20,
        color: '#000000',

    },
    Wrapper:{
        flex:1,
        
        paddingBottom:'14%',
        backgroundColor:'white'
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
        height:'13%',
        alignSelf:'center',
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 'normal',
        color:'black',
        backgroundColor:'#F4F4F4',
    },
    mainWrapper:{
        top:'10%',
        flexDirection:'column',
        
    },
    street:{
        alignSelf:'center',
        top:'10%',
        width:'80%',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',

    },
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly'
    },
    home:{
        top:'10%',
        width:'20%',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',
    },
    Button:{
        top:'30%',
        right:'10%',
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:50,
        backgroundColor:'#FF4D00',
        borderRadius: 4,

    },
    ButText:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#FFFFFF',
    },
})