import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import ScreenNames from '../../../navigation/ScreenNames';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {cartActions} from '../../Cart/store/cartStore';
import {ordersActions} from '../store/ordersStore';

type RootStackParamList = {
  OrderType: undefined;
  navigate: any;
};

const OrderPayment = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const orders = useAppSelector(state => state.orders);
  const navigation = useNavigation<RootStackParamList>();

  const [checkedFirs, toggleCheckedFirs] = useState(false);
  const [checkedSecond, toggleCheckedSecond] = useState(false);
  const [checkedThird, toggleCheckedThird] = useState(false);

  const checkFuncFirst = () => {
    toggleCheckedFirs(!checkedFirs);
    toggleCheckedSecond(false);
    toggleCheckedThird(false);
  };

  const checkFuncSec = () => {
    toggleCheckedSecond(!checkedSecond);
    toggleCheckedFirs(false);
    toggleCheckedThird(false);
  };

  const checkFuncThird = () => {
    toggleCheckedThird(!checkedThird);
    toggleCheckedFirs(false);
    toggleCheckedSecond(false);
  };
  const handleAddOrderType = (item: any) => {
    dispatch(ordersActions.addPaymentType(item));
  };
  const handleClear = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.CartMain)}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> {orders.orderType}</Text>
      </View>
      <Text style={styles.Header}>Выберите способ оплаты</Text>
      <View style={styles.OrderWrapper}>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../../../img/nall.png')}
          />
          <Text
            style={[
              styles.OrderText,
              cart.dishes.length === 0 ? styles.OrderTextDisabled : undefined,
            ]}>
            Наличными
          </Text>
          <CheckBox
            onPress={() => {
              checkFuncFirst();
            }}
            disabled={cart.dishes.length === 0 ? true : false}
            checked={checkedFirs}
            checkedIcon={
              <Image source={require('../../../../img/checked.png')} />
            }
            uncheckedIcon={
              <Image source={require('../../../../img/unChecked.png')} />
            }
          />
        </View>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../../../img/cardOnline.png')}
          />
          <Text style={styles.OrderText}>Картой онлайн</Text>
          <CheckBox
            onPress={() => {
              checkFuncSec();
            }}
            checked={checkedSecond}
            checkedIcon={
              <Image source={require('../../../../img/checked.png')} />
            }
            uncheckedIcon={
              <Image source={require('../../../../img/unChecked.png')} />
            }
          />
        </View>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../../../img/card.png')}
          />
          <Text
            style={[
              styles.OrderText,
              cart.dishes.length === 0 ? styles.OrderTextDisabled : undefined,
            ]}>
            Картой на месте
          </Text>
          <CheckBox
            disabled={cart.dishes.length === 0 ? true : false}
            onPress={() => {
              checkFuncThird();
            }}
            checked={checkedThird}
            checkedIcon={
              <Image source={require('../../../../img/checked.png')} />
            }
            uncheckedIcon={
              <Image source={require('../../../../img/unChecked.png')} />
            }
          />
        </View>
      </View>
      <Text style={styles.prgressText}> шаг 3/3</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
          if (checkedFirs) {
            handleAddOrderType('0');

            navigation.navigate(ScreenNames.OrderDetails);
          } else if (checkedSecond) {
            handleAddOrderType('1');

            navigation.navigate(ScreenNames.OrderDetails);
          } else if (checkedThird) {
            handleAddOrderType('2');

            navigation.navigate(ScreenNames.OrderDetails);
          }
        }}>
        <Text style={styles.ButText}> ДАЛЕЕ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderPayment;
