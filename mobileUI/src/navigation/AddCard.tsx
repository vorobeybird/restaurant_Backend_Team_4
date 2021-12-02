import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Touchable, TextInput, ToastAndroid} from 'react-native';
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { addCard } from "../store/StoreCard";
type RootStackParamList = {
    ConfirmOrder: undefined;
    navigate:any;
  }


export const AddCard = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const [card, setCard] = useState({num:'',live:'',cvv:'',name:'',id:1,type:''})
    const dispatch = useDispatch()
    const handleAddCard = (item:any) => {
        dispatch(addCard(item))
    }
    const regexSixteen = new RegExp("^[0-9]{16}$");
    const regexCvv = new RegExp("^[0-9]{3}$");
    const regexDate = new RegExp("^(0[1-9]|1[0-2])\/[0-9]{2}");
    const [error, setError] = useState({
        sixTeen:'',
        Cvv:'',
        Date:'',
    })
    const required = () => {
        let sixTeenErr,CvvErr,DateErr
        if (!card.num){
            sixTeenErr = 'Введите номер карты'
        } else if(regexSixteen.test(card.num) === false ) {
            sixTeenErr = 'Введите номер карты'
        } else {
            sixTeenErr = ''
        }
        if (!card.cvv){
            CvvErr = 'Введите код CVV'
        } else if(regexSixteen.test(card.cvv) === false ) {
            CvvErr = 'Введите код CVV'
        } else {
            CvvErr = ''
        }
        if (!card.live){
            DateErr = 'Введите месяц/год'
        } else if(regexDate.test(card.live) === false ) {
            DateErr = 'Введите месяц/год'
        } else {
            DateErr = ''
        }
        setError({sixTeen:sixTeenErr,Cvv:CvvErr,Date:DateErr})
    }
    const showToast = () => {
        ToastAndroid.showWithGravity(
          "Карта добавлена",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      };
    return (
        <View style={styles.Wrapper}>
            <View style={styles.Title}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
                </TouchableOpacity>
                <Text style={styles.TitleText}> Добавить карту</Text>
            </View>
            <View style={styles.mainWrapper}>
                <Text style={styles.textNumber}>Номер карты</Text>
                <Image style={styles.CardPict} source={require('../../img/myCard.png')}/>
                <TextInput 
                        style={styles.number}
                        placeholder='1234 1234 1234 1234'
                        onChangeText={(val)=> {
                            setCard({...card,num:val, });
                            
                            
                        }}
                    />
                <Text style={styles.errorNum}>{error.sixTeen}</Text>
                <View style={styles.inpCont}>
                    <View style={styles.col}>
                        <Text style={styles.textLive}>Срок действия</Text>
                        <TextInput 
                                style={styles.live}
                                placeholder='MM/YY'
                                onChangeText={(val)=> setCard({...card,live:val, })}
                            />
                        <Text style={styles.errorStreet}>{error.Date}</Text>
                    </View>
                    <View>
                        <Text style={styles.textLiveCvv}>CVV/CVC</Text>
                        <TextInput 
                                style={styles.Cvv}
                                placeholder='***'
                                onChangeText={(val)=> setCard({...card,cvv:val, })}
                            />
                        <Text style={styles.errorCvv}>{error.Cvv}</Text>
                    </View>
                </View>
                <Text style={styles.textName}>Имя владельца карты</Text>
                    <TextInput 
                            style={styles.Name}
                            placeholder='   IVAN IVANOV'
                            onChangeText={(val)=> setCard({...card,name:val, })}
                        />
            </View>
            
            <TouchableOpacity style={styles.Button} onPress={() => {
                if(card.num !='' && card.cvv !='' && card.live !='' && regexSixteen.test(card.num) === true && regexCvv.test(card.cvv) === true && regexDate.test(card.live) === true){
                    handleAddCard(card);showToast(); goBack()
                } 
                else { 
                    required()
                }
            }}>
                <Text style={styles.ButText}> Подтвердить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    HeadWrap:{
        top:'7%',
    },
    CardPict:{
        position:'absolute',
        top:'18%',
        left:'85%',
        zIndex:1,
    },
    number:{
        marginLeft:'5%',
        width:'90%',
        backgroundColor:'#E2E6EE',
        borderRadius:10,
    },
    textNumber:{
       
        marginLeft:'5%',
        color:'black',
    },
    live:{
        width:130,
        borderRadius:10,
        backgroundColor:'#E2E6EE',
    },
    errorCvv:{
        top:5,
        right:10,
        color:'red',
    },
    errorStreet:{
        top:5,
        
        color:'red',
    },
    errorNum:{
        top:5,
        left:15,
        color:'red',
    },
    textLive:{
        
        color:'black',
    },
    Cvv:{
        width:130,
        right:15,
        borderRadius:10,
        backgroundColor:'#E2E6EE',
    },
    textLiveCvv:{
        right:15,
        color:'black',
    },
    Name:{
        
        marginLeft:'5%',
        borderRadius:10,
        width:'90%',
        backgroundColor:'#E2E6EE', 
    },
    textName:{
        marginTop:10,
        marginLeft:'5%',
        color:'black',
    },
    col:{
        marginLeft:'5%',
        borderRadius:10,
        flexDirection:'column',
    },
    Header: {
        alignSelf:'center',
        
        fontFamily:'Roboto',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        lineHeight:20,
        color: '#000000',

    },
    inpCont:{
        marginTop:10,
        justifyContent:'space-between',
        flexDirection:'row',
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
        fontSize: 24,
        fontWeight: 'normal',
        color:'black',
    },
    Title: {
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%',
        height:'8%',
        alignSelf:'center',
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: 'normal',
        color:'black',
        backgroundColor:'white',
        elevation:10,
    },
    mainWrapper:{
        alignSelf:'center',
        justifyContent:'center',
        width:'80%',
        height:300,
        top:'10%',
        flexDirection:'column',
        elevation:5,
        borderRadius:20,
        backgroundColor:'white',
    },
    street:{
        alignSelf:'center',
        top:'10%',
        width:'80%',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',

    },
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly'
    },
    home:{
        top:'10%',
        width:'20%',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',
    },
    Button:{
        position:'absolute',
        top:'85%',
        width:'90%',
        
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        
        height:50,

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