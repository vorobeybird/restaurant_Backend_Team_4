import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useEffect, useState} from 'react';
import {OrderedDish} from './OrderedDish';
import {useSelector, useDispatch} from 'react-redux';
import {getTotals, clearCart} from '../store/StoreCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

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
type RootStackParamList = {
  ChoseTypeOrder: undefined;
  navigate: any;
};
export const MarketMain = () => {
  const cart = useSelector(state => state.dishes);
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackParamList>();

  const handleClear = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <View style={styles.mainCont}>
      <View style={styles.PictCont}>
        <Text style={styles.Header}>Корзина</Text>
        <TouchableOpacity onPress={() => handleClear()}>
          {cart.dishes.length === 0 ? (
            <></>
          ) : (
            <Image style={styles.Bin} source={require('../../img/bin.png')} />
          )}
        </TouchableOpacity>
      </View>
      {cart.dishes.length === 0 ? (
        <View style={styles.emptyCardWrapper}>
          <Image
            style={styles.emptyCard}
            source={require('../../img/emptyCard.png')}
          />
          <Text style={styles.emptyCardText}> Ваша корзина пуста </Text>
          <Text style={styles.emptyText}> Похоже, вы пока ничего не </Text>
          <Text style={styles.emptyText}> добавили в корзину </Text>
          <TouchableOpacity
            style={styles.ButtonWrapper}
            onPress={() => {
              navigation.navigate('MenuTabNavigation');
            }}>
            <Text style={styles.ButtText}> ПЕРЕЙТИ В МЕНЮ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <OrderedDish />
          <View style={styles.FinalCheckCont}>
            <Text style={styles.SimpText}>
              Итого: {cart.cardTotalAmount} BYN
            </Text>
            <View style={styles.ButWrapp}>
              <Text
                style={styles.But}
                onPress={() => navigation.navigate('ChoseTypeOrder')}>
                ДАЛЕЕ
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Bin: {
    // right: '30%',
    width: 30,
    height: 30,
  },
  mainCont: {
    flex: 1,
    backgroundColor: 'white',
  },
  PictCont: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ffffff',
  },
  Header: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 33,
    color: '#000000',
  },
  FoodContainer: {
    top: '20%',
    left: '10%',
  },
  TypeWrapper: {
    top: '5%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TypeContainer: {
    flexDirection: 'row',
  },
  FinalCheckCont: {
    width: 341,
    height: 60.43,
    top: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: 'white',
  },
  ButWrapp: {
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    height: '70%',
    borderRadius: 4,
    backgroundColor: '#FF4D00',
  },
  But: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
  TextType: {
    width: 80,
    color: '#000000',
  },
  SimpText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 15,
    color: '#000000',
  },
  emptyCard: {
    alignSelf: 'center',
  },
  emptyCardWrapper: {
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCardText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23,
    color: '#000000',
  },
  emptyText: {
    color: '#606060',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 15,
  },
  ButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%',
    height: '17%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButtText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
});
