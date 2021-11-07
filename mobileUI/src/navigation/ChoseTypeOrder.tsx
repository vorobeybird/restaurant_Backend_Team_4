import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ConfirmOrder } from './ConfirmOrder'
import {MarketMain } from '../marketComponents/MarketMain'
import {addOrderType} from '../store/StoreCard'

import { useDispatch } from "react-redux";

type RootStackParamList = {
    ChoseTypeOrder: undefined;
    navigate:any;
  }

export const ChoseTypeOrder = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<RootStackParamList>();
    const [checkedFirs, toggleCheckedFirs] = useState(false);
    const [checkedSecond, toggleCheckedSecond] = useState(false);
    const [checkedThird, toggleCheckedThird] = useState(false);

    const checkFuncFirst = () => {
        toggleCheckedFirs(!checkedFirs)
        toggleCheckedSecond(false)
        toggleCheckedThird(false)
    }

    const checkFuncSec = () => {
        toggleCheckedSecond(!checkedSecond)
        toggleCheckedFirs(false)
        toggleCheckedThird(false)
    }

    const checkFuncThird = () => {
        toggleCheckedThird(!checkedThird)
        toggleCheckedFirs(false)
        toggleCheckedSecond(false)
    }
    const handleAddOrderType = (item:any) => {
        dispatch(addOrderType(item))
      }
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
            <TouchableOpacity onPress={() => navigation.navigate('MarketMain')}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText}> Корзина</Text>
            </View>
            <Text style={styles.Header}>Выберите тип заказа</Text>
            <View style={styles.OrderWrapper}>
                <View style={styles.ContentWrapper}>
                    <Image source={require('../../img/orderTable.png')}/>
                    <Text style={styles.OrderText}>Забронировать стол</Text>
                    <CheckBox
                        onPress={() => {checkFuncFirst()}}
                        checked={checkedFirs}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
                <View style={styles.ContentWrapper}>
                    <Image source={require('../../img/delivery.png')}/>
                    <Text style={styles.OrderText}>Доставка</Text>
                    <CheckBox
                        onPress={() => {checkFuncSec()}}
                        checked={checkedSecond}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
                <View style={styles.ContentWrapper}>
                    <Image source={require('../../img/takeAway.png')}/>
                    <Text style={styles.OrderText}>Навынос</Text>
                    <CheckBox
                        onPress={() => {checkFuncThird()}}
                        checked={checkedThird}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
            </View>
            <TouchableOpacity style={styles.Button} onPress={()=> { if(checkedThird) {
                    navigation.navigate('ConfirmOrder');handleAddOrderType("Навынос");
            }}}>
                <Text style={styles.ButText}> ДАЛЕЕ</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    Header: {
        alignSelf:'center',
        top:'10%',
        fontFamily:'Roboto',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        lineHeight:20,
        color: '#000000',

    },
    OrderWrapper:{
        top:'20%',
        
        flexDirection:'column',
    },
    ContentWrapper:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    OrderText:{
        lineHeight: 24,
        color:'black',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
    },
    Button:{
        top:'40%',
        right:'10%',
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        width:'25%',
        height:'8%',
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
