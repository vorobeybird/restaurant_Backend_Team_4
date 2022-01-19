import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import {useAppDispatch} from '../../../hooks/hooks';
import ScreenNames from '../../../navigation/ScreenNames';
import styles from './styles';
import {ordersActions} from '../store/ordersStore';

type RootStackParamList = {
  OrderConfirmationTeble: undefined;
  navigate: any;
};

interface table {
  id: number;
  table_number: number;
  persons: number;
  reserve: [];
}

const OrderTableConfirm = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackParamList>();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [reservedTable, setTable] = useState<table[]>([]);
  const [tablePool, setTablePool] = useState<table[]>([]);
  const [availableTables, setavailableTables] = useState([]);

  const showToastSuccs = () => {
    ToastAndroid.showWithGravity(
      'Стол забронирован',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const checkAvailableTable = (table: any) => {
    if (!table.reserve) {
      return true;
    }

    if (table.reserve && table.reserve.length < 3) {
      return true;
    } else {
      return false;
    }
  };

  //   const handleSetTable = (table: table) => {
  //       setTable()
  //   }

  const getTablesByDate = async (date: any) => {
    const correctDate = dayjs(date).format('YYYY-MM-DD');
    const response = await axios.get<table[]>(
      `http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/tables/${correctDate}`,
    );
    const res = response.data;
    setTable(res);
  };
  const getTablePool = async () => {
    const response = await axios.get<table[]>(
      'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/tablepool',
    );
    const res = response.data;
    setTablePool(res);
  };

  useEffect(() => {
    getTablesByDate(date);
    getTablePool();
    tables(date);
    console.log(tablePool);
    console.log(reservedTable);
  }, []);

  const concatResult = (arr1: table[], arr2: table[]) => {
    const result = [...new Set([...arr1, ...arr2])];
    let res = result.filter(
      (v, i, a) => a.findIndex(t => t.table_number === v.table_number) === i,
    );
    console.log(res, 'resresres');
    return res;
  };

  const findAvailableTables = (tables: any) => {
    let tempAvailable: any = [];
    let tempAllTables: any = [];
    tables.forEach((table: any) => {
      if (table.persons) {
        if (
          checkAvailableTable(table) &&
          !tempAvailable.includes(table.persons)
        ) {
          tempAvailable.push(table.persons);
        } // push table to available tables pool if it is not added there yet
        if (!tempAllTables.includes(table.persons)) {
          tempAllTables.push(table.persons);
        }
      }
    });
    setavailableTables(tempAvailable);
    tempAllTables.sort((a: any, b: any) => a - b);
  };

  const tables = (currentDate: any) => {
    getTablesByDate(currentDate);
    const tables = concatResult(reservedTable, tablePool);
    findAvailableTables(tables);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    hideDatePicker();
    tables(currentDate);
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
  const checkNum = () => {
    if (chooseTable === 'На двоих') {
      handleGetNumOfPersons(2);
      console.log(2);
    } else if (chooseTable === 'На четверых') {
      handleGetNumOfPersons(4);
      console.log(4);
    } else if (chooseTable === 'На шестерых') {
      handleGetNumOfPersons(6);
      console.log(6);
    } else if (chooseTable === 'На восьмерых') {
      handleGetNumOfPersons(8);
      console.log(8);
    } else if (chooseTable === 'На десятерых') {
      handleGetNumOfPersons(10);
      console.log(10);
    }
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
  const options = {
    2: 'На двоих',
    4: 'На четверых',
    6: 'На шестерых',
    8: 'На восьмерых',
    10: 'На десятерых',
  };

  const ModalPicker = () => {
    const onPressItem = (option: any) => {
      changeModalVisible(false);
      setChooseTable(option);
    };

    const option = availableTables.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onPressItem(options[item])}>
          <Text style={styles.modalText}>{options[item]}</Text>
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
            {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </Text>
          <Image
            style={styles.dateImage}
            source={require('../../../../img/calendar.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimepicker} style={styles.box}>
          <Text style={styles.dateText}>
            {date.getHours()}.{date.getMinutes()}
          </Text>
          <Image
            style={styles.dateImage}
            source={require('../../../../img/clock.png')}
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
          handleAddDate(dayjs(date).toISOString());
          checkNum();
          showToastSuccs();
          navigation.navigate(ScreenNames.OrderPayment);
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderTableConfirm;
