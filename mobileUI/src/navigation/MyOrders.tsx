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
    
    console.log(cart)
    const [state, setState] = useState( true )
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
                </TouchableOpacity>
                <Text style={styles.TitleText}>Мои заказы</Text>
            </View>
            <TouchableOpacity onPress={() => setState(!state)}>
                <View>
                    <Text>Текущие/история</Text>
                </View>
            </TouchableOpacity>
            {state === true ? (
                        <View>
                            <View>
                                {cart.dishes.length ? (
                                    <View>
                                        <View style={styles.orderType}>
                                        <View style={styles.flexWrapper}>
                                        <View style={styles.flexEnd}>
                                            <Text style={styles.color}>ТИП ЗАКАЗА</Text>
                                            <Text style={styles.color}> ДАТА</Text>
                                            <Text style={styles.color}> ВРЕМЯ</Text>
                                            <Text style={styles.color}> ОПЛАТА</Text>
                                            <Text style={styles.color}>СТАТУС</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.simpText}>{cart.orderType}</Text>
                                            <Text style={styles.simpText}>13 октября</Text>
                                            <Text style={styles.simpText}>15:00</Text>
                                            <Text style={styles.simpText}>{cart.paymentType}</Text>
                                            <Text style={styles.simpText}>Принят в работу</Text>
                                        </View>
                                        </View>
                                    </View>
                                    <View style={styles.orderDishes}>
                                        <View style={styles.rowWrapper}>
                                        <Text style={styles.color}>БЛЮДО</Text>
                                        <Text style={styles.color}>ЦЕНА</Text>
                                        <Text style={styles.color}>КОЛ-ВО</Text>
                                        <Text style={styles.color}>СУММА</Text>
                                        
                                        </View>
                                        <View
                                        style={{
                                            paddingTop: 15,
                                            borderBottomColor: '#979A9F',
                                            borderBottomWidth: 0.3,
                                        }}
                                        />
                                        {cart.dishes.map((item: any) => {
                                            let newTitle
                                            if(item.title.length >7){
                                              let name = item.title.substr(0,6)
                                               newTitle = name+'...'
                                              console.log(newTitle)
                                            } else {
                                              newTitle = item.title
                                            }
                                            
                                            return(
                                                <View style={styles.contContent} key={item.id}>
                                                    <Text style={styles.simpText}>{newTitle}</Text>
                                                    <Text style={styles.Price}> {item.price} BYN</Text>
                                                    <Text style={styles.Qan}> {item.cardQuantity}</Text>
                                                    <Text style={styles.simpText}>
                                                    {item.price * item.cardQuantity} BYN
                                                </Text>
                                            
                                        </View>
                                        )})}
                                        <View
                                        style={{
                                            paddingTop: 15,
                                            borderBottomColor: '#979A9F',
                                            borderBottomWidth: 0.3,
                                        }}
                                        />
                                        <View style={styles.TotalCounter}>
                                        <Text style={styles.finHardText}>ИТОГО</Text>
                                        <Text style={styles.finText}>{cart.cardTotalAmount} BYN</Text>
                                        </View>
                                    </View>
                                        </View>
                                ):(
                                        <View style={styles.EmptyTextWrapper}>
                                            <Text style={styles.EmptyText}>У вас нет текущих заказов</Text>
                                            <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Menu')}>
                                                <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
                                            </TouchableOpacity>
                                        </View>
                                
                                )}
                            </View>
                        </View>
                ):
                    (   
                        <View>
                        <View>
                            {cart.order.dishes.length ? (
                                <View>
                                    <View style={styles.orderType}>
                                    <View style={styles.flexWrapper}>
                                    <View style={styles.flexEnd}>
                                        <Text style={styles.color}>ТИП ЗАКАЗА</Text>
                                        <Text style={styles.color}> ДАТА</Text>
                                        <Text style={styles.color}> ВРЕМЯ</Text>
                                        <Text style={styles.color}> ОПЛАТА</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.simpText}>{cart.orderType}</Text>
                                        <Text style={styles.simpText}>13 октября</Text>
                                        <Text style={styles.simpText}>15:00</Text>
                                        <Text style={styles.simpText}>{cart.paymentType}</Text>
                                    </View>
                                    </View>
                                </View>
                                <View style={styles.orderDishes}>
                                    <View style={styles.rowWrapper}>
                                    <Text style={styles.color}>БЛЮДО</Text>
                                    <Text style={styles.color}>ЦЕНА</Text>
                                    <Text style={styles.color}>КОЛ-ВО</Text>
                                    <Text style={styles.color}>СУММА</Text>
                                    </View>
                                    <View
                                    style={{
                                        paddingTop: 15,
                                        borderBottomColor: '#979A9F',
                                        borderBottomWidth: 0.3,
                                    }}
                                    />
                                    {cart.order.dishes.map((item: any) => (
                                    <View style={styles.contContent} key={item.id}>
                                        <Text style={styles.simpText}>{item.title}</Text>
                                        <Text style={styles.Price}> {item.price} BYN</Text>
                                        <Text style={styles.Qan}> {item.cardQuantity}</Text>
                                        <Text style={styles.simpText}>
                                        {item.price * item.cardQuantity} BYN
                                        </Text>
                                    </View>
                                    ))}
                                    <View
                                    style={{
                                        paddingTop: 15,
                                        borderBottomColor: '#979A9F',
                                        borderBottomWidth: 0.3,
                                    }}
                                    />
                                    <View style={styles.TotalCounter}>
                                    <Text style={styles.finHardText}>ИТОГО</Text>
                                    <Text style={styles.finText}>{cart.cardTotalAmount} BYN</Text>
                                    </View>
                                </View>
                                    </View>
                            ):(
                                    <View style={styles.EmptyTextWrapper}>
                                        <Text style={styles.EmptyText}>Ваша история заказов пуста</Text>
                                        <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Menu')}>
                                            <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
                                        </TouchableOpacity>
                                    </View>
                            
                            )}
                        </View>
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
        top:'50%'
    },
    EmptyText:{
        position:'absolute',
        top:200,
        
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
    orderType: {
        paddingBottom: 15,
        paddingTop: 15,
        top: '5%',
        elevation: 3,
        alignSelf: 'center',
        width: '96%',
        backgroundColor: '#F3F5F9',
        borderRadius: 10,
      },
      flexWrapper: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
      },
      flexEnd: {
        justifyContent: 'flex-end',
      },
      color: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 13,
        lineHeight: 18,
    
        color: '#979A9F',
      },
      simpText: {
        color: 'black',
      },
      orderDishes: {
        paddingBottom: 15,
        paddingTop: 15,
        top: '10%',
        elevation: 3,
        alignSelf: 'center',
        width: '96%',
        backgroundColor: '#F3F5F9',
        borderRadius: 10,
      },
      rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  contContent: {
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  Qan: {
    color: 'black',
    right: '70%',
  },
  Price: {
    color: 'black',
    right: '75%',
  },
  TotalCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finHardText: {
    left: 45,
    paddingTop: 15,
    color: '#FF4D00',
  },
  finText: {
    right: 40,
    color: 'black',
    paddingTop: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
    Button:{
        position:'absolute',
        top:400,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:60,
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
