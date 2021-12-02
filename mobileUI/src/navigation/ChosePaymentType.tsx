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
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {addPaymentType, clearCart} from '../store/StoreCard';

import {useDispatch, useSelector} from 'react-redux';

type RootStackParamList = {
  ChoseTypeOrder: undefined;
  navigate: any;
};

export const ChosePaymentType = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.dishes);
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
    dispatch(addPaymentType(item));
  };
  const handleClear = () => {
    dispatch(clearCart());
  };

  const typeOrd = useSelector(state => state.dishes);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => navigation.navigate('MarketMain')}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> {cart.orderType}</Text>
      </View>
      <Text style={styles.Header}>Выберите способ оплаты</Text>
      <View style={styles.OrderWrapper}>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../img/nall.png')}
          />
          <Text
            style={[
              styles.OrderText,
              typeOrd.orderType === 'Бронирование стола'
                ? styles.OrderTextDisabled
                : undefined,
            ]}>
            Наличными
          </Text>
          <CheckBox
            onPress={() => {
              checkFuncFirst();
            }}
            disabled={typeOrd.orderType === 'Бронирование стола' ? true : false}
            checked={checkedFirs}
            checkedIcon={<Image source={require('../../img/checked.png')} />}
            uncheckedIcon={
              <Image source={require('../../img/unChecked.png')} />
            }
          />
        </View>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../img/cardOnline.png')}
          />
          <Text style={styles.OrderText}>Картой онлайн</Text>
          <CheckBox
            onPress={() => {
              checkFuncSec();
            }}
            checked={checkedSecond}
            checkedIcon={<Image source={require('../../img/checked.png')} />}
            uncheckedIcon={
              <Image source={require('../../img/unChecked.png')} />
            }
          />
        </View>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../img/card.png')}
          />
          <Text
            style={[
              styles.OrderText,
              typeOrd.orderType === 'Бронирование стола'
                ? styles.OrderTextDisabled
                : undefined,
            ]}>
            Картой на месте
          </Text>
          <CheckBox
            disabled={typeOrd.orderType === 'Бронирование стола' ? true : false}
            onPress={() => {
              checkFuncThird();
            }}
            checked={checkedThird}
            checkedIcon={<Image source={require('../../img/checked.png')} />}
            uncheckedIcon={
              <Image source={require('../../img/unChecked.png')} />
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

            navigation.navigate('OrderDetails');
          } else if (checkedSecond) {
            handleAddOrderType('1');

            navigation.navigate('OrderDetails');
          } else if (checkedThird) {
            handleAddOrderType('2');

            navigation.navigate('OrderDetails');
          }
        }}>
        <Text style={styles.ButText}> ДАЛЕЕ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgLeft: {
    top: 5,
    resizeMode: 'contain',
    width: 40,
    height: 40,
    left: 20,
  },
  Wrapper: {
    flex: 1,

    paddingBottom: '14%',
    backgroundColor: 'white',
  },
  Arrow: {
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  prgressText: {
    position: 'absolute',
    top: '60%',
    alignSelf: 'center',
    color: '666666',
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    color: 'black',
  },
  Title: {
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#ffffff',
  },
  Header: {
    alignSelf: 'center',
    top: '2%',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  OrderWrapper: {
    top: '15%',

    flexDirection: 'column',
  },
  ContentWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  OrderText: {
    top: 14,
    lineHeight: 24,
    color: 'black',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  OrderTextDisabled: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  Button: {
    top: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
