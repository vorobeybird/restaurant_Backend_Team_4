import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Touchable} from 'react-native';
import { useState } from "react";
import { addDate } from '../store/StoreCard' 
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
type RootStackParamList = {
    ConfirmOrder: undefined;
    navigate:any;
  }


export const ConfirmOrder = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const cart = useSelector((state) => state.dishes);
    const dispatch = useDispatch()
    const navigation = useNavigation<RootStackParamList>();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState();
    const [show, setShow] = useState(false);

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
    const handleConfirm = () => {
        
        hideDatePicker();
    };

    const handleAddDate= (item:any) => {
        dispatch(addDate(item))
    };

    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText}> {cart.orderType}</Text>
            </View>
            <View>
                    <TouchableOpacity onPress={showDatepicker} style={styles.box}>
                        <Text style={styles.dateText}>Выбрать дату</Text>
                        <Image style={styles.dateImage} source={require('../../img/calendar.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showTimepicker} style={styles.box}>
                        <Text style={styles.dateText}>Выбрать время</Text>
                        <Image style={styles.dateImage} source={require('../../img/clock.png')}/>
                    </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={ ()=> {handleConfirm()} }
                        
                    />
                )}
            </View>
            <TouchableOpacity style={styles.Button} onPress={() => {
                handleAddDate(date.toString())
                if(cart.orderType == 'Навынос'){
                    navigation.navigate('ChosePaymentType')
                } else if(cart.orderType == 'Доставка') {
                    navigation.navigate('writeAdress')
                }
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
        height:'20%',
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
        fontSize: 30,
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