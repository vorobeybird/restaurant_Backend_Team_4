import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Dimensions, ToastAndroid} from 'react-native';
import { useState, useEffect } from "react";
import { addDate, getNumOfPersons } from '../store/StoreCard' 
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import styles from './orderTable/style';
import dayjs from 'dayjs';
type RootStackParamList = {
    ConfirmOrderTeble: undefined;
    navigate:any;
  }

  interface category {
    id: number,
    table_number: number,
    persons: number,
    reserve: [],
  }


export const OrderTable = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const cart = useSelector((state) => state.dishes);
    const dispatch = useDispatch()
    const navigation = useNavigation<RootStackParamList>();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState();
    const [show, setShow] = useState(false);
    
    let devState: any[] = [];

    const showToast = () => {
        ToastAndroid.showWithGravity(
          'Стол занят',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      };

    const showToastSuccs = () => {
        ToastAndroid.showWithGravity(
          'Стол забронирован',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
    };
    interface Order {
        delivery_method: string;
        payment_method: number;
        customer_id: string;
        total_price: number;
        delivery_date: string;
        comment: string;
        dish: DishShortInfo[];
        adress: string;
        contact_name: string;
        contact_phone: string;
        num_of_persons: number;
    }

    interface OrderTemp extends Order {
        reserve_time: string;
        reserve_date: string;
      }
    interface DishShortInfo {
        dish_id: number;
        dish_amount: number;
        excluded_ingredients: string;
      }
    /////////////////////////

    const onMakingOrder = () => {
        let dishesShortInfo = cart.dishes.map((item:any) => {
            let dish = {} as DishShortInfo;
            dish.dish_id = item.id;
            dish.dish_amount = item.cardQuantity;
            
            return dish;
        });
        let currentOrder = {} as OrderTemp;
        currentOrder.delivery_method = cart.orderType;
        currentOrder.payment_method = cart.paymentType *1;
        currentOrder.customer_id = 'asdfasdf';
        currentOrder.contact_name = cart.userInfo.name +" "+cart.userInfo.surName;
        currentOrder.contact_phone = cart.userInfo.phone;
        currentOrder.total_price = cart.cardTotalAmount;
        currentOrder.delivery_date = cart.date;
        currentOrder.comment = "Hi, I'm hardcode comment :)";
        currentOrder.num_of_persons = cart.num;
        currentOrder.reserve_date = "2021-11-29T";
        currentOrder.reserve_time = cart.date;
        currentOrder.dish = dishesShortInfo;
        console.log(currentOrder)
        return axios

        .post('http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/reserve', currentOrder, {
        headers: {
            "Content-type": "application/json",
            "cross-domain": "true",
        },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };


    //////////////////

    const getItems = async () => {
        const response = await axios.get<category[]>('http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/tables')
        const res = response.data
        return res
    }
    
    const fetchMenuItems = async () => {
        const items = await getItems()
        setTable(items)
    }
    
    
      useEffect(() => {
        fetchMenuItems()
      
      },[])

    const onChange  = async (event:any, selectedDate:any) => {
        const currentDate = selectedDate || date;
        await setDate(currentDate);
        hideDatePicker()

      };

    const showMode = (currentMode:any) => {
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
    const handleGetNumOfPersons = (item:any) => {
        dispatch(getNumOfPersons(item))
        
    };
    const handleAddDate= (item:any) => {
        dispatch(addDate(item))
    };

    const [chooseTable, setChooseTable] = useState('Выберите стол')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const changeModalVisible = (bool:any) => {
        setIsModalVisible(bool)
    }
    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height
    const options = [ 'На двоих',  'На четверых', 'На шестерых', 'На восьмерых', 'На десятерых']

    
    const ModalPicker = () => {

        const onPressItem = (option:any) => {
            changeModalVisible(false)
            setChooseTable(option)
        }

        const option = options.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => onPressItem(item)}
                    >
                        <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <TouchableOpacity onPress={() => changeModalVisible(false)} style={styles.container}>
                <View style={[styles.modal, {width: WIDTH-WIDTH*0.2, height: HEIGHT/2}]}>
                    {option}
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
                </TouchableOpacity>
                <Text style={styles.TitleText}> Забронировать стол</Text>
            </View>
            <View>
                <TouchableOpacity onPress={showDatepicker} style={styles.box} onPressIn={() => {
                        
                }}>
                    <Text style={styles.dateText}>{dayjs(date).format('YYYY-MM-DD')}</Text>
                    <Image style={styles.dateImage} source={require('../../img/calendar.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeModalVisible(true)} style={styles.box} onPressIn={() => {
                        
                }}>
                    <Text style={styles.dateText}>{chooseTable}</Text>
                    <Image style={styles.dateImage} source={require('../../img/vect.png')}/>
                </TouchableOpacity>
                <Modal transparent={true} animationType='fade' visible={isModalVisible} onRequestClose={() => changeModalVisible(false)}>
                    <ModalPicker/>
                </Modal>

                <TouchableOpacity onPress={showTimepicker} style={styles.box}>
                    <Text style={styles.dateText}>{dayjs(date).format('HH:mm')}</Text>
                    <Image style={styles.dateImage} source={require('../../img/clock.png')}/>
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
            <TouchableOpacity style={styles.Button} onPress={() => {
                getTableByNum()
                onMakingOrder()
                
            }}>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

