import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Touchable, TextInput, ToastAndroid} from 'react-native';
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
type RootStackParamList = {
    ConfirmOrder: undefined;
    navigate:any;
  }


export const writeAdress = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const cart = useSelector((state) => state.dishes);
    const dispatch = useDispatch()
    const navigation = useNavigation<RootStackParamList>();
    const [street, setStreet] = useState('')
    const [home, setHome] = useState('')
    const [corp, setCorp] = useState('')
    const [dep, setDep] = useState('')
    const [error, setError] = useState({
        street:'',
        home:'',
        corp:'',
    })

    const nameRegEx = new RegExp("^([а-яА-Я]{2,30})");
    const required = () => {
        let streetErr,homeErr
        if (!street){
            streetErr = 'Введите название улицы'
        } else if(nameRegEx.test(street) === false ) {
            streetErr = 'Введите название улицы'
        } else {
            streetErr = ''
        }
        if (!home){
            homeErr = 'Введите номер дома'
        } else {
            homeErr = ''
        }
        setError({street:streetErr,home:homeErr})
    }


    const showToast = () => {
        ToastAndroid.showWithGravity(
          "Введите необходимые поля",
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
                <Text style={styles.Header}> Выберите адрес доставки</Text>
            </View>
            <View style={styles.mainWrapper}>
                <TextInput 
                    style={styles.street}
                    placeholder='*Улица'
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    onChangeText={(val)=> setStreet(val)}
                    
                />
                <Text style={styles.errorStreet}>{error.street}</Text>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.home}
                        placeholder='*Дом'
                        placeholderTextColor='rgba(0, 0, 0, 0.6)'
                        onChangeText={(val)=> setHome(val)}
                    />
                    
                    <TextInput 
                        style={styles.home}
                        placeholder='Корпус'
                        placeholderTextColor='rgba(0, 0, 0, 0.6)'
                        onChangeText={(val)=> setCorp(val)}
                    />
                    <TextInput 
                        style={styles.home}
                        placeholder='Квартира'
                        placeholderTextColor='rgba(0, 0, 0, 0.6)'
                        onChangeText={(val)=> setDep(val)}
                    />
                </View>
                <Text style={styles.errorHome}>{error.home}</Text>
            </View>
            <Text style={styles.prgressText}> шаг 3/3</Text>
            <TouchableOpacity style={styles.Button} onPress={() => {
                    if(street !='' && home !='' && nameRegEx.test(street) === true){
                        navigation.navigate('ChosePaymentType')
                    } 
                    else { required()
                        return (
                            
                            showToast()
                        )
                    }
                } 
                
                }>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    HeadWrap:{
        top:'2%',
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
    errorStreet:{
        top:20,
        left:40,
        color:'red',
    },
    errorHome:{
        top:50,
        left:40,
        color:'red',
        
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
        top:'12%',
        flexDirection:'column',
        
    },
    prgressText:{
        position:'absolute',
        top:'60%',
        alignSelf:'center',
        color:'666666',
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