import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Dimensions, ToastAndroid} from 'react-native';
import { useState, useEffect } from "react";
import { addDate,getNumOfPersons } from '../store/StoreCard' 
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
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


export const ConfirmOrderTable = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const cart = useSelector((state) => state.dishes);
    const dispatch = useDispatch()
    const navigation = useNavigation<RootStackParamList>();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState();
    const [show, setShow] = useState(false);
    const [getTable, setTable] = useState()
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
    }
    const checkNum = () => {
        if(chooseTable ==='На двоих') {
            handleGetNumOfPersons(2)
            console.log(2)
        }else if(chooseTable ==='На четверых') {
            handleGetNumOfPersons(4)
            console.log(4)
        }else if(chooseTable ==='На шестерых') {
            handleGetNumOfPersons(6)
            console.log(6)
        }else if(chooseTable ==='На восьмерых') {
            handleGetNumOfPersons(8)
            console.log(8)
        }else if(chooseTable ==='На десятерых') {
            handleGetNumOfPersons(10)
            console.log(10)
        }
    }
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
            <Text style={styles.prgressText}> шаг 2/3</Text>
            <TouchableOpacity style={styles.Button} onPress={() => {      
                handleAddDate(dayjs(date).toISOString())   
                checkNum()
                navigation.navigate('ChosePaymentType')
            }}>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    dateImage:{
        right:15, 
    },
    modal:{
       
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:5,
        elevation:5,
    },
    option:{
        alignItems:'center',
    },
    modalText:{

        margin:20,
        fontWeight:'700',
        color:'black',
    },
    container:{
        top:'20%',
        alignItems:'center',
        justifyContent:'center',
    },
    prgressText:{
        position:'absolute',
        top:'60%',
        alignSelf:'center',
        color:'#666666',
    },
    dateText:{
        left:10,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color:'black'
    },
    box:{
        top:'5%',
        width:'90%',
        height:'15%',
        alignSelf:'center',
        justifyContent:'space-between',
        borderRadius: 4,
        alignItems:'center',
        flexDirection:'row',
        borderWidth:1,
        marginTop:'5%'
    },
    Wrapper:{
        flex:1,
        
        paddingBottom:'14%',
        backgroundColor:'white'
      },
    Arrow:{
        top:'26%',
        width:30,
        height:30,
        marginRight:15,
        marginLeft:5,
    },
    TitleText:{
        alignSelf:'center',
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: 'normal',
        color:'black',
    },
    Title: {
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%',
        height:'13%',
        alignSelf:'center',
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 'normal',
        color:'black',
        backgroundColor:'#F4F4F4',
    },
    
    Button:{
        top:'20%',
        right:'10%',
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        width:'25%',
        height:'8%',
        backgroundColor:'#FF4D00',
        borderRadius: 4,

    },
    ButText:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#FFFFFF',
    },
})