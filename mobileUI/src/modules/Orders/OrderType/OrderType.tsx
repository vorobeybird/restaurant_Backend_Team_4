import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {addOrderType} from '../../../store/StoreCard';

import {useDispatch} from 'react-redux';
import ScreenNames from '../../../navigation/ScreenNames';
import styles from './styles';

type RootStackParamList = {
  OrderType: undefined;
  navigate: any;
};

const OrderType = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();
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
    dispatch(addOrderType(item));
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
        <Text style={styles.TitleText}> Корзина</Text>
      </View>
      <Text style={styles.Header}>Выберите тип заказа</Text>
      <View style={styles.OrderWrapper}>
        <View style={styles.ContentWrapper}>
          <Image
            style={styles.imgLeft}
            source={require('../../../../img/orderTable.png')}
          />
          <Text style={styles.OrderText}>Забронировать стол</Text>
          <CheckBox
            onPress={() => {
              checkFuncFirst();
            }}
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
            source={require('../../../../img/delivery.png')}
          />
          <Text style={styles.OrderText}>Доставка</Text>
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
            source={require('../../../../img/takeAway.png')}
          />
          <Text style={styles.OrderText}>Навынос</Text>
          <CheckBox
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
      <Text style={styles.prgressText}> шаг 1/3</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (checkedThird) {
            navigation.navigate(ScreenNames.OrderConfirmation);
            handleAddOrderType('Самовывоз');
          } else if (checkedSecond) {
            navigation.navigate(ScreenNames.OrderConfirmation);
            handleAddOrderType('Доставка');
          } else if (checkedFirs) {
            navigation.navigate(ScreenNames.OrderConfirmation);
            handleAddOrderType('Бронирование стола');
          }
        }}>
        <Text style={styles.ButText}> ДАЛЕЕ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderType;
