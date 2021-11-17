import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Button, TextInput} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { addUserInfo} from '../store/StoreCard'
import { useDispatch } from "react-redux";

type RootStackParamList = {
    
    navigate:any;
}


export const PersonalData = ({  navigation: { goBack }, route }:{navigation:any, route:any}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [state, setState] = useState({
        name:'',
        surName:'',
        phone:'',  
    })

    const handleAddUserInfo = (item:any) => {
        dispatch(addUserInfo(item))
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
            <Text style={styles.simpText}> Фамилия </Text>
            <TextInput 
                    placeholderTextColor="#C6C6C6" 
                    style={styles.street}
                    placeholder='Фамилия'
                    onChangeText={(val) => setState({...state,surName:val})}
                    
                />
            <Text style={styles.simpText}> Телефон </Text>
            <TextInput 
                    placeholderTextColor="#C6C6C6" 
                    style={styles.street}
                    placeholder='Телефон'
                    onChangeText={(val) => setState({...state,phone:val})}
                    
                />
            </View>
            
            <TouchableOpacity style={styles.butStyle} onPress={()=> {handleAddUserInfo(state);navigation.navigate('ProfileComponent')}}>
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
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',
        marginBottom:'2%',
        
        color:'black'

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
