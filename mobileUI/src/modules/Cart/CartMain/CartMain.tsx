import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import OrderedDish from './components/OrderedDish';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {cartActions} from '../store/cartStore';
import {CartMainScreenNavigationProp} from '../../../navigation/routes/auxillaryNavigators/CartNavigator';

const CartMain = () => {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation<CartMainScreenNavigationProp>();

  const handleClear = () => {
    dispatch(cartActions.clearCart());
  };

  useEffect(() => {
    dispatch(cartActions.getTotals());
  }, [cart, dispatch]);

  return (
    <View style={styles.mainCont}>
      <View style={styles.PictCont}>
        <Text style={styles.Header}>Корзина</Text>
        <TouchableOpacity onPress={() => handleClear()}>
          {cart.dishes.length === 0 ? (
            <></>
          ) : (
            <Image
              style={styles.Bin}
              source={require('../../../../img/bin.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      {cart.dishes.length === 0 ? (
        <View style={styles.emptyCardWrapper}>
          <Image
            style={styles.emptyCard}
            source={require('../../../../img/emptyCard.png')}
          />
          <Text style={styles.emptyCardText}> Ваша корзина пуста </Text>
          <Text style={styles.emptyText}> Похоже, вы пока ничего не </Text>
          <Text style={styles.emptyText}> добавили в корзину </Text>
          <TouchableOpacity
            style={styles.ButtonWrapper}
            onPress={() => {
              navigation.navigate(ScreenNames.MenuNavigator);
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
                onPress={() => navigation.navigate(ScreenNames.OrderType)}>
                ДАЛЕЕ
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartMain;
