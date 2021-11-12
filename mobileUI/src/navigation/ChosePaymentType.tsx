import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import {addPaymentType, clearCart } from '../store/StoreCard'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

type RootStackParamList = {
    ChoseTypeOrder: undefined;
    navigate:any;
  }

  interface DishShortInfo {
    dish_id: number;
    dish_amount: number;
  }

  interface Order {
    adress: string;
    customer_id: string;
    delivery_method: string;
    total_price: number;
    delivery_date: Date;
    contact_name: string;
    payment_method: boolean;
    contact_phone:string;
    comment: string;
    dish: DishShortInfo[];
  }

export const ChosePaymentType = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const dispatch = useDispatch()

    const showToast = () => {
        ToastAndroid.showWithGravity(
          "Заказ отправлен",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };

    const cart = useSelector((state) => state.dishes);
    const navigation = useNavigation<RootStackParamList>();
    const [checkedFirs, toggleCheckedFirs] = useState(false);
    const [checkedSecond, toggleCheckedSecond] = useState(false);
    const [checkedThird, toggleCheckedThird] = useState(false);
    const onMakingOrder = () => {
        let order = {} as Order;
        order.adress = "Brest";
        order.customer_id = '89897751894yafsjkdbfkjsdaf';
        order.delivery_method = cart.orderType;
        order.total_price = cart.cardTotalAmount;
        order.delivery_date = cart.date;
        order.contact_name = "EdgarAllanPoe +375666666666";
        order.contact_phone = "+375291234567"
        order.payment_method = cart.paymentType;
        order.comment = "Hi, I'm hardcode comment";

        let dishesShortInfo = cart.dishes.map((item:any) => {
            let dish = {} as DishShortInfo;
            dish.dish_id = item.id;
            dish.dish_amount = item.cardQuantity;
            return dish;
        });

        order.dish = dishesShortInfo;
    
        axios.post("http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/order", order, {
            headers: { "Content-type": "application/json" },
          })
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        console.log(order);
      };
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
        dispatch(addPaymentType(item))
      }
    const handleClear= () => {
        dispatch(clearCart())
    };
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
            <TouchableOpacity onPress={() => navigation.navigate('MarketMain')}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText}> {cart.orderType}</Text>
            </View>
            <Text style={styles.Header}>Выберите способ оплаты</Text>
            <View style={styles.OrderWrapper}>
                <View style={styles.ContentWrapper}>
                    <Image style={styles.imgLeft} source={require('../../img/nall.png')}/>
                    <Text style={styles.OrderText}>Наличными</Text>
                    <CheckBox
                        onPress={() => {checkFuncFirst()}}
                        checked={checkedFirs}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
                <View style={styles.ContentWrapper}>
                    <Image style={styles.imgLeft} source={require('../../img/cardOnline.png')}/>
                    <Text style={styles.OrderText}>Картой онлайн</Text>
                    <CheckBox
                        onPress={() => {checkFuncSec()}}
                        checked={checkedSecond}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
                <View style={styles.ContentWrapper}>
                    <Image style={styles.imgLeft} source={require('../../img/card.png')}/>
                    <Text style={styles.OrderText}>Картой на месте</Text>
                    <CheckBox
                        onPress={() => {checkFuncThird()}}
                        checked={checkedThird}
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/unChecked.png')} />}/>
                </View>
            </View>
            <TouchableOpacity style={styles.Button} onPress={()=> { 
                if(checkedThird) {
                    handleAddOrderType("2");
                    onMakingOrder()
                    showToast()
                    handleClear()
                    navigation.navigate('Menu')
                } else if(checkedFirs){
                    handleAddOrderType("1");
                    onMakingOrder()
                    showToast()
                    handleClear()
                    navigation.navigate('Menu')
                } else if(checkedSecond){
                    handleAddOrderType("0");
                    onMakingOrder()
                    showToast()
                    handleClear()
                    navigation.navigate('Menu')
                }
            
            }}>
                <Text style={styles.ButText}> ДАЛЕЕ</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imgLeft:{
        left:20,
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
