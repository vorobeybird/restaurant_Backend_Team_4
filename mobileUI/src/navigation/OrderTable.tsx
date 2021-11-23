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
    const [getTable, setTable] = useState([])
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
          'Стол за вами',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      };

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

    const onMakingOrder = () => {
        let order = {} as OrderTemp;
        order.total_price = 0;
        order.delivery_date = cart.date;
        order.comment = "Hi, I'm hardcode comment :)";
        order.dish = [];
        order.contact_name = cart.userInfo.name;
        order.contact_phone = cart.userInfo.phone;
        order.adress = "bookTable";
        order.num_of_persons = cart.num;
        order.reserve_date = cart.date;
        order.reserve_time = cart.date;
    console.log(order)
        return axios
          .post(`http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/reserve`, order, {
            headers: {
              "Content-type": "application/json",
              "cross-domain": "true",
            },
          })
          .then((response) => response)
          .catch((err) => {console.log(err);console.log(order)});
        } 
        devState = []   
        const getTableByNum = () => {
            handleGetNumOfPersons(2)
            handleAddDate(date.toString())
            getTable.map((element:any) => {
                if(element.persons === 2) {
                    devState.push(element)
                }

            });
            

        }

        getTableByNum()
        let arr = []
        const tableMakeOrder = () => {
            getTableByNum()
            console.log(devState, 'devState')
            
            devState.map((item:any) => {
                item.reserve.map((data:any) => {
                    
                    if(data.reserve_date == dayjs(date).format('YYYY-MM-DD') && data.reserve_time == dayjs(date).format('HH:mm:00')){
                        showToast()
                    } else {
                        showToastSuccs()
                        onMakingOrder()
                        navigation.navigate('Menu')
                        devState = []
                        
                    }
                })
                
            })
            
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
                        <Text style={styles.dateText}>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</Text>
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
                        <Text style={styles.dateText}>{date.getHours()}.{date.getMinutes()}</Text>
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
                tableMakeOrder()
                
                }}>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

