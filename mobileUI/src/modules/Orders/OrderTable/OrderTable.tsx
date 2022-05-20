import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import Api from '../../../apiSecure/Api';
import styles from './styles';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {IOrder, ordersActions} from '../store/ordersStore';

type RootStackParamList = {
  OrderConfirmationTeble: undefined;
  navigate: any;
};

interface category {
  id: number;
  table_number: number;
  persons: number;
  reserve: [];
}

const OrderTable = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const cart = useAppSelector(state => state.cart);
  const order = useAppSelector(state => state.orders);
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackParamList>();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);

  interface IOrderTemp extends IOrder {
    reserve_time: string;
    reserve_date: string;
  }
  interface DishShortInfo {
    dish_id: number;
    dish_amount: number;
    excluded_ingredients: string;
  }

  const onMakingOrder = () => {
    let dishesShortInfo = cart.dishes.map((item: any) => {
      let dish = {} as DishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.cardQuantity;

      return dish;
    });

    let currentOrder = {} as IOrderTemp;
    currentOrder.delivery_method = order.orderType;
    currentOrder.payment_method = +order.paymentType;
    currentOrder.customer_id = 'asdfasdf';
    currentOrder.contact_name =
      user.userInfo.name + ' ' + user.userInfo.surName;
    currentOrder.contact_phone = user.userInfo.phone;
    currentOrder.total_price = cart.cardTotalAmount;
    currentOrder.delivery_date = order.date;
    currentOrder.comment = "Hi, I'm hardcode comment :)";
    currentOrder.num_of_persons = +order.num;
    currentOrder.reserve_date = '2021-11-29T';
    currentOrder.reserve_time = order.date;
    currentOrder.dish = dishesShortInfo;
    console.log(currentOrder);
    return Api.post(
      'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/reserve',
      currentOrder,
      {
        headers: {
          'Content-type': 'application/json',
          'cross-domain': 'true',
        },
      },
    )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };


  const PATH = process.env.REACT_APP_GET_DISHES

  const getItems = async () => {
    const response = await Api.get<category[]>(
      `${PATH}/api/tables`,
    );
    const res = response.data;
    return res;
  };

  const fetchMenuItems = async () => {
    const items = await getItems();
    // setTable(items);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

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
  const handleGetNumOfPersons = (item: any) => {
    dispatch(ordersActions.getNumOfPersons(item));
  };
  const handleAddDate = (item: any) => {
    dispatch(ordersActions.addDate(item));
  };

  const [chooseTable, setChooseTable] = useState('Выберите стол');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool: any) => {
    setIsModalVisible(bool);
  };
  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  const options = [
    'На двоих',
    'На четверых',
    'На шестерых',
    'На восьмерых',
    'На десятерых',
  ];

  const ModalPicker = () => {
    const onPressItem = (option: any) => {
      changeModalVisible(false);
      setChooseTable(option);
    };

    const option = options.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onPressItem(item)}>
          <Text style={styles.modalText}>{item}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <TouchableOpacity
        onPress={() => changeModalVisible(false)}
        style={styles.container}>
        <View
          style={[
            styles.modal,
            {width: WIDTH - WIDTH * 0.2, height: HEIGHT / 2},
          ]}>
          {option}
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.TitleText}> Забронировать стол</Text>
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
        <TouchableOpacity
          onPress={() => changeModalVisible(true)}
          style={styles.box}
          onPressIn={() => {}}>
          <Text style={styles.dateText}>{chooseTable}</Text>
          <Image
            style={styles.dateImage}
            source={require('../../../../img/vect.png')}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisible(false)}>
          <ModalPicker />
        </Modal>

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
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          onMakingOrder();
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderTable;
