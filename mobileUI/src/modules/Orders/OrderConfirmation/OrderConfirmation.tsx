import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {ordersActions} from '../store/ordersStore';

type RootStackParamList = {
  OrderConfirmation: undefined;
  navigate: any;
};

const OrderConfirmation = ({navigation: {goBack}}: {navigation: any}) => {
  const orders = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackParamList>();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);

  const onChange = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    await setDate(currentDate);
    hideDatePicker();
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const hideDatePicker = () => {
    setShow(false);
  };
  const handleConfirm = (val: any) => {
    hideDatePicker();
  };

  const handleAddDate = (item: any) => {
    dispatch(ordersActions.addDate(item));
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> {orders.orderType}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.box}
          onPressIn={() => {}}>
          <Text style={styles.dateText}>
            {dayjs(date).format('YYYY-MM-DD')}
          </Text>
          <Image
            style={styles.dateImage}
            source={require('../../../../img/calendar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker} style={styles.box}>
          <Text style={styles.dateText}>{dayjs(date).format('HH:mm')}</Text>
          <Image
            style={styles.dateImage}
            source={require('../../../../img/clock.png')}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <Text style={styles.prgressText}> шаг 2/3</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          console.log(date);
          handleAddDate(date.toString());
          if (orders.orderType == 'Самовывоз') {
            navigation.navigate(ScreenNames.OrderPayment);
          } else if (orders.orderType == 'Доставка') {
            navigation.navigate(ScreenNames.OrderAddress);
          }
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfirmation;
