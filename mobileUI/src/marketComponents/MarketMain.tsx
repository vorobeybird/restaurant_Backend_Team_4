import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { useEffect,  } from 'react';
import { OrderedDish } from './OrderedDish';
import { useSelector, useDispatch } from 'react-redux';
import { getTotals } from '../store/StoreCard';
import axios from "axios";

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
    contact_info: string;
    payment_method: boolean;
    comment: string;
    dish: DishShortInfo[];
  }
export const MarketMain = () => {
    const cart = useSelector((state) => state.dishes);
    const dispatch = useDispatch();
    
    const onMakingOrder = () => {
        let order = {} as Order;
        order.adress = "Brest";
        order.customer_id = "asdfjorop21341234";
        order.delivery_method = "Самовывоз";
        order.total_price = cart.cardTotalAmount;
        order.delivery_date = new Date();
        order.contact_info = "EdgarAllanPoe +375666666666";
    
        order.payment_method = true;
        order.comment = "Hi, I'm hardcode comment :)";
    
        let dishesShortInfo = cart.dishes.map((item:any) => {
          let dish = {} as DishShortInfo;
          dish.dish_id = item.id;
          dish.dish_amount = item.amount;
          return dish;
        });
    
        order.dish = dishesShortInfo;
    
        axios
          .post("http://localhost:5000/api", order, {
            headers: { "Content-type": "application/json" },
          })
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        console.log(order);
      };




    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);
      console.log()
  return (
    <View>
         <View style={styles.PictCont}>
            <Image source={require('../../img/close.png')}/>
            <Text style={styles.Header}>Заказ</Text>
            <Image source={require('../../img/bin.png')}/>
        </View>
        
        <OrderedDish/>
        <View style={styles.TypeWrapper}>
            <Text style={styles.TextType}>Выберите вид заказа:</Text>
            <View >
                <View style={styles.TypeContainer}>
                    <Image source={require('../../img/car.png')}/>
                    <Text style={styles.SimpText}>  Доставка заказа</Text>
                </View>
            </View>
        </View>
        <View style={styles.FinalCheckCont}>
            <Text style={styles.SimpText}>Итоговая сумма: {cart.cardTotalAmount} BYN</Text>
            <Text style={styles.But} onPress={onMakingOrder}>Далее</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    PictCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingLeft: 5,
        paddingRight:5
    },
    Header: {
        alignSelf:'center',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',

    },
    FoodContainer:{
        top:'20%',
        left:'10%',
    },
    TypeWrapper:{
        top:'5%',
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    TypeContainer:{
        flexDirection:'row',
    },
    FinalCheckCont:{
        width: 341,
        height: 60.43,
        top:'20%',
        flexDirection:'row',
        alignSelf: 'center',
        alignItems:'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        backgroundColor: '#C4C4C433',
    },
    But:{
        width: 100,
        borderWidth: 1,
        textAlign:'center',
        paddingTop:4,
        height:30,
        borderRadius:40,
        backgroundColor:'#99fda9',
        borderColor:'green',
        color: '#000000',
    },
    TextType:{
        width:80,
        color: '#000000',
    },
    SimpText:{
        color: '#000000',
    }
});


