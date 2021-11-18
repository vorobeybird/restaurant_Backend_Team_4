import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { getOrder, clearCart } from '../store/StoreCard';


interface DishShortInfo {
  dish_id: number;
  dish_amount: number;
  excluded_ingredients: string;
}

interface Order {
  adress: string;
  customer_id: string;
  delivery_method: string;
  total_price: number;
  delivery_date: Date;
  contact_name: string;
  payment_method: boolean;
  contact_phone: string;
  comment: string;
  dish: DishShortInfo[];
}

export const OrderDetails = ({
  navigation: {goBack},
  route
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleGetOrder = (item:any) => {
    dispatch(getOrder(item));
  }
  const handleGetHistory = (item:any) => {
    dispatch(getHistory(item));
  }
  const handleclearCart = () => {
    dispatch(clearCart());
  }
  const cart = useSelector(state => state.dishes);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Заказ отправлен',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  const onMakingOrder = () => {
    let order = {} as Order;
    order.adress = 'asdf';
    order.customer_id = '89897751894yafsjkdbfkjsdaf';
    order.delivery_method = cart.orderType;
    order.total_price = cart.cardTotalAmount;
    order.delivery_date = cart.date;
    order.contact_name = cart.userInfo.surName;
    order.contact_phone = cart.userInfo.phone;
    order.payment_method = cart.paymentType;
    order.comment = "Hi, I'm hardcode comment";

    let dishesShortInfo = cart.dishes.map((item: any) => {
      let dish = {} as DishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.cardQuantity;
      dish.excluded_ingredients = item.excluded_ingredients
        ? item.excluded_ingredients
        : '';
      return dish;
    });
    
    order.dish = dishesShortInfo;
    
    axios
      .post(
        'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/order',
        order,
        {
          headers: {'Content-type': 'application/json'},
        },
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Детали заказа</Text>
      </View>
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
        {cart.dishes.map((item: any) => (
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
      <TouchableOpacity
        style={styles.butStyle}
        onPress={() => {
          showToast();
          onMakingOrder();
          clearCart()
          
          navigation.navigate('Menu')
          
          
        }}>
        <Text style={styles.ButText}> ГОТОВО </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
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
  butStyle: {
    position: 'absolute',
    top: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  TotalCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    right: '70%',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  color: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 18,

    color: '#979A9F',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  Title: {
    flexDirection: 'row',
    height: '9%',
    width: '100%',

    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
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
  flexWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Arrow: {
    top: '26%',
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  simpText: {
    color: 'black',
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
});
