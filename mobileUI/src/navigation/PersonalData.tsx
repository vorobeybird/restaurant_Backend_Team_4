import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, TextInput} from 'react-native';
import {Auth} from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { addUserInfo} from '../store/StoreCard'
import { useDispatch, useSelector } from "react-redux";

type RootStackParamList = {
    navigate:any;
}
const nameRegEx = new RegExp("^([а-яА-Я]{2,30})");

export const PersonalData = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const user = useSelector(state => state.dishes.userInfo.attributes);
    const [state, setState] = useState({
        name:'',
        surName:'',
        phone:'',  
    })
    
    async function updateUserAttributesHandler() {
        try {
            if (user) {
                console.log(user,'asdfasdfasdfasdfasdf')
                console.log(state)
                const userAmp = await Auth.currentAuthenticatedUser();
                await Auth.updateUserAttributes(userAmp, {
                    name: state.name,
                    family_name: state.surName,
                    phone_number: state.phone
                });
                const updatedUser = await Auth.currentAuthenticatedUser();
                handleAddUserInfo(updatedUser)
        }    
        } catch (err) {
            console.log(err)
        }
    }
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    
    const [error, setError] = useState({
        name:'',
        surName:'',
        phone:'',
    })

    const handleAddUserInfo = (item:any) => {
        dispatch(addUserInfo(item))
    }
    const required = () => {
        let nameErr,surNameErr,phoneErr
        if (!state.name){
            nameErr = 'Введите имя'
        } else if(nameRegEx.test(state.name) === false ) {
            nameErr = 'Введите имя'
        } else {
            nameErr = ''
        }
        if (!state.surName){
            surNameErr = 'Введите фамилию'
        }else if(nameRegEx.test(state.surName) === false ) {
            surNameErr = 'Введите фамилию'
        } else {
            surNameErr = ''
        }
        if (!state.phone){
            phoneErr = 'Введите телефон'
        } else {
            phoneErr = ''
        }
        setError({name:nameErr,surName:surNameErr,phone:phoneErr})
    }
    return (
      <View style={styles.Wrapper}>
          <View style={styles.Title}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.Arrow} source={require('../../img/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleText}>Личные данные</Text>
            </View>
            <View style={styles.Wrap}>
            <Text style={styles.simpText}> Имя </Text>
            <TextInput 
                    placeholderTextColor="#C6C6C6" 
                    style={styles.street}
                    placeholder='Имя'
                    onChangeText={(val) => setState({...state,name:val})}
                    
                />
                <Text style={styles.error}> {error.name} </Text>
            <Text style={styles.simpText}> Фамилия </Text>
            <TextInput 
                    placeholderTextColor="#C6C6C6" 
                    style={styles.street}
                    placeholder='Фамилия'
                    onChangeText={(val) => setState({...state,surName:val})}
                    
                />
                <Text style={styles.error}> {error.surName} </Text>
            <Text style={styles.simpText}> Телефон </Text>
            <TextInput 
                    placeholderTextColor="#C6C6C6" 
                    style={styles.street}
                    placeholder='Телефон'
                    onChangeText={(val) => setState({...state,phone:val})}
                    
                />
            </View>
            <Text style={styles.error}> {error.phone} </Text>
            <TouchableOpacity style={styles.butStyle} onPress={()=> {required();
                    if(nameRegEx.test(state.name) === false ||  nameRegEx.test(state.surName) === false) {
                        required()  
                    } else if(state.name && state.surName && state.phone ){
                        updateUserAttributesHandler();navigation.navigate('ProfileComponent')
                    } }}>
                    <Text style={styles.ButText}> ГОТОВО </Text>
            </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    Wrapper:{
        flex:1,
        backgroundColor:'white',
    },
    Wrap:{
        top:'5%',
    },
    butStyle:{
        position:'absolute',
        top:'75%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:'8%',
        backgroundColor:'#FF4D00',
        borderRadius: 4,
    },
    street:{
        alignSelf:'center',
        top:'6%',
        width:'90%',
        
        borderRadius:4,
        borderColor:'#C6C6C6',
        marginBottom:'2%',
        backgroundColor:'#E2E6EE',
        color:'#666666'

    },
    Title: {
        flexDirection:'row',
        height:'9%',
        width:'100%',
        
        
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 'normal',
        color:'black',
        backgroundColor:'#F4F4F4',
    },
    Container:{
        top:'15%',
    },
    Arrow:{
        top:'26%',
        width:30,
        height:30,
        marginRight:15,
        marginLeft:5,
    },
    simpText:{
        left:'5%',
        top:'5%',
        color:'black',

    },
    error:{
        left:15,
        color:'red',
        top:'4%',
    },
    TitleText:{
        alignSelf:'center',
        fontFamily: 'Roboto',
        
        fontSize: 25,
        fontWeight: 'normal',
        color:'black',
    },
    Button:{
        top:'70%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
        height:'8%',
        backgroundColor:'#FF4D00',
        borderRadius: 4,

    },
    ButText:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#FFFFFF',
    },

})
