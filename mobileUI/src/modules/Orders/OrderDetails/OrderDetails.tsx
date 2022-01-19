import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api from '../../../apiSecure/Api';
import ScreenNames from '../../../navigation/ScreenNames';
import {RootStackParamList} from '../../Menu/MenuMain/MenuMain';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {IDishShortInfo, ordersActions} from '../store/ordersStore';
import {cartActions} from '../../Cart/store/cartStore';

const OrderDetails = ({
  navigation: {goBack},
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useAppDispatch();
  const [id, setId] = useState();
  const user = useAppSelector(state => state.auth);
  const order = useAppSelector(state => state.orders);
  const cart = useAppSelector(state => state.cart);
  const [pay, setPay] = useState('');
  console.log(user.userInfo.attributes.name, 'cart');
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Заказ отправлен',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  // const handleAddOrderHistoryItem = (item: any) => {
  //   dispatch(ordersActions.addOrderHistoryItem(item));
  // };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };
  // const historyOrder = {
  //   id: order.date,
  //   type: order.orderType,
  //   date: order.date,
  //   paymentType: order.paymentType,
  //   orderStatus: 'Завершен',
  // };

  const onMakingOrder = () => {
    let order = {} as any;
    order.adress = 'asdf';
    order.customer_id = user.userInfo.attributes.sub;
    order.delivery_method = order.orderType;
    order.total_price = cart.cardTotalAmount;
    order.delivery_date = order.date;
    order.contact_name =
      user.userInfo.attributes.name +
      ' ' +
      user.userInfo.attributes.family_name;
    order.contact_phone = user.userInfo.attributes.phone_number;
    order.payment_method = order.paymentType;
    order.comment = "Hi, I'm hardcode comment";

    let dishesShortInfo = cart.dishes.map((item: any) => {
      let dish = {} as IDishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.cardQuantity;
      dish.excluded_ingredients = item.excluded_ingredients
        ? item.excluded_ingredients
        : '';
      return dish;
    });

    order.dish = dishesShortInfo;

    Api.post(
      'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/order',
      order,
      {
        headers: {'Content-type': 'application/json'},
      },
    )
      .then((response: any) => console.log(response, 'order'))
      .catch(err => console.log(err));
  };

  const onMakingOrderTable = async () => {
    console.log(cart);
    let order = {} as any;
    order.num_of_persons = order.num;
    order.customer_id = user.userInfo.attributes.sub;
    order.contact_name =
      user.userInfo.attributes.name +
      ' ' +
      user.userInfo.attributes.family_name;
    order.contact_phone = user.userInfo.attributes.phone_number;
    order.payment_method = 1;
    order.adress = 'bookTable';
    order.status = 'bla';
    order.comment = 'bla';
    order.delivery_method = order.orderType;
    order.total_price = cart.cardTotalAmount;
    order.delivery_date = order.date;
    order.reserve_time = order.date;
    order.reserve_date = order.date;

    let dishesShortInfo = cart.dishes.map((item: any) => {
      let dish = {} as IDishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.cardQuantity;
      dish.excluded_ingredients = item.excluded_ingredients
        ? item.excluded_ingredients
        : '';
      return dish;
    });

    order.dish = dishesShortInfo;

    const servResp = await Api.post(
      'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/reserve',
      order,
      {
        headers: {'Content-type': 'application/json'},
      },
    );
    const res = servResp;
    console.log(res, 'res');
    console.log(order, 'order');
  };

  const payWordFunc = () => {
    let payWord = '';
    if (order.paymentType === '0') {
      payWord = 'Наличными';
    } else if (order.paymentType === '1') {
      payWord = 'Картой онлайн';
    } else if (order.paymentType === '2') {
      payWord = 'Картой';
    }

    setPay(payWord);
  };
  useEffect(() => {
    payWordFunc();
  }, []);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
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
            <Text style={styles.simpText}>{order.orderType}</Text>
            <Text style={styles.simpText}>13 октября</Text>
            <Text style={styles.simpText}>15:00</Text>
            <Text style={styles.simpText}>{pay}</Text>
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
          let newTitle;
          if (item.title.length > 7) {
            let name = item.title.substr(0, 7);
            newTitle = name + '...';
            console.log(newTitle);
          } else {
            newTitle = item.title;
          }

          return (
            <View style={styles.contContent} key={item.id}>
              <Text style={styles.simpText}>{newTitle}</Text>
              <Text style={styles.Price}> {item.price} BYN</Text>
              <Text style={styles.Qan}> {item.cardQuantity}</Text>
              <Text style={styles.simpText}>
                {item.price * item.cardQuantity} BYN
              </Text>
            </View>
          );
        })}
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
          if (order.orderType == 'Бронирование стола') {
            onMakingOrderTable();
          } else {
            onMakingOrder();
          }
          console.log(id);

          // handleAddOrderHistoryItem(historyOrder)
          handleClearCart();

          navigation.navigate(ScreenNames.Home);
        }}>
        <Text style={styles.ButText}> ГОТОВО </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetails;
