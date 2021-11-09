import React, {useState} from "react";
import {Auth} from 'aws-amplify'
import { View, Text,TouchableOpacity, Button, TextInput, StyleSheet, Dimensions,Alert} from 'react-native';
import { Provider, useSelector } from "react-redux";
import { BottomTabNavigation } from '../navigation/nav'
const windowWidth = Dimensions.get('window').width

const DisplayNav = (props:any) => {
    
      return (
      
        <BottomTabNavigation/>
    
      ) 
    
}


const ConfirmSignUp = (props: any)=> {
    const cart = useSelector((state) => state.dishes);
    const [state, setState] = useState({
        email:cart.email,
        confirmationCode:'',
    })

    const onSubmit = async () => {
        const {email:username, confirmationCode: code} = state
            try {
                const user = await Auth.confirmSignUp(cart.email,code);
                console.log('succsess')
                props.onStateChange('SignIn', state)
            } catch(error:any){
                console.log(error,"error")
            }
    }
    

    if(props.authState === 'confirmSignUp'){
    return (
        <View style={styles.Wrapper}>
            <Text style={styles.HeadStyle}>Подтвердить код</Text>
            <TextInput 
                    style={styles.street}
                    placeholder='email'
                    onChangeText={() => setState({...state,email:cart.email})}
                    value={cart.email}
                />
            
            <TextInput 
                    style={styles.street}
                    placeholder='Код'
                    onChangeText={(val) => setState({...state,confirmationCode:val})}
                    value={state.confirmationCode}
                />
                
            <View style={styles.ButCont}>
                <TouchableOpacity
                    onPress={() => props.onStateChange('signIn', {})}
                >
                    <Text style={styles.SimpText}>back to signIn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.onStateChange('signUp', {})}
                >
                    <Text style={styles.SimpText}>back to signUp</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.Button} onPress={()=> { onSubmit();}}>
                <Text style={styles.ButText}> ЗАРЕГЕСТРИРОВАТЬСЯ</Text>
            </TouchableOpacity>
        </View>
    )} else {
        return (
            <DisplayNav/>
        )
    }
}

const styles = StyleSheet.create({
    Wrapper:{
        flex:1,
        backgroundColor:'white'
    },
    HeadStyle: {
        alignSelf:'center',
        fontFamily:'Roboto',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        lineHeight:20,
        color: '#000000',

    },
    street:{
        alignSelf:'center',
        top:'5%',
        width:windowWidth - windowWidth*0.2,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#C6C6C6',
        marginBottom:'2%',
        Bottom:'5%'
        

    },
    ButCont:{
        top:'30%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        
    },
    SimpText:{
        color:'black'
    },
    Button:{
        top:'5%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:windowWidth-windowWidth*0.2,
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
    error:{
        color:'red',
        top:'4%',
    }
})

export default ConfirmSignUp