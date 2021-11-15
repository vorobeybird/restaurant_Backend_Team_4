import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'

type RootStackParamList = {
    
    navigate:any;
  }


export const MyOrders = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const navigation = useNavigation()
    const cart = useSelector((state) => state.dishes);
    const [state, setState] = useState( true )
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
                </TouchableOpacity>
                <Text style={styles.TitleText}>Адрес доставки</Text>
            </View>
            <TouchableOpacity onPress={() => setState(!state)}>
                <View>
                    <Text>asdfjasdkgjlksadmfkl</Text>
                </View>
            </TouchableOpacity>
            {state === true ? (
                <View style={styles.EmptyTextWrapper}>
                    <Text style={styles.EmptyText}>У вас нет текущих заказов</Text>
                    <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Menu')}>
                        <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
                    </TouchableOpacity>
                </View>
            ):
                (   
                    <View style={styles.EmptyTextWrapper}>
                        <Text style={styles.EmptyText}>Ваша исторя заказов пуста</Text> 
                        <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Menu')}>
                            <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
                        </TouchableOpacity>
                    </View>
                    
        
        
                )
    
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    Wrapper:{
        flex:1,
        backgroundColor:'white',
    },
    EmptyTextWrapper:{
        justifyContent:'center',
        top:'30%'
    },
    EmptyText:{
        bottom:'70%',
        position:'absolute',
        alignSelf:'center',
        fontWeight:'800',
        fontSize:20,
        color: 'black',
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
        
        fontSize: 25,
        fontWeight: 'normal',
        color:'black',
    },
    Button:{
        top:'70%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:'25%',
        backgroundColor:'#FF4D00',
        borderRadius: 4,

    },
    ButText:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#FFFFFF',
    },
})
