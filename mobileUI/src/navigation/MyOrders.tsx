import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList} from 'react-native';
import styles from "./myOrders/style";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';
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
                ):
                    (   
                        <View>
                       
                            {cart.orderHistory.length ? (
                                <FlatList 
                                    style={styles.size}
                                    data={cart.orderHistory}
                                    renderItem={({ item }) => { 
                                        return (
                                                <View style={styles.orderType} key={item.id}>
                                                    <View style={styles.flexWrapper}>
                                                        <View style={styles.flexEnd}>
                                                            <Text style={styles.color}>ТИП ЗАКАЗА</Text>
                                                            <Text style={styles.color}> ДАТА</Text>
                                                            <Text style={styles.color}> ВРЕМЯ</Text>
                                                            <Text style={styles.color}> ОПЛАТА</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.simpText}>{item.type}</Text>
                                                            <Text style={styles.simpText}>{dayjs(item.date).format('YYYY-MM-DD')}</Text>
                                                            <Text style={styles.simpText}>{dayjs(item.date).format('HH:mm')}</Text>
                                                            <Text style={styles.simpText}>{item.paymentType}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                        )}}
                                        />
                            ):(
                                    <View style={styles.EmptyTextWrapper}>
                                        <Text style={styles.EmptyText}>Ваша история заказов пуста</Text>
                                        <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Menu')}>
                                            <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
                                        </TouchableOpacity>
                                    </View>
                            
                            )}
                        </View>
                   
                    )
        
                }
            
        </View>
    )
}


