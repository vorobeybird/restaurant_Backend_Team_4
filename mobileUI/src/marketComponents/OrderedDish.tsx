import React from 'react';
import {
    Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { delFromCard, decreaseCartQuant, addToCard } from '../store/StoreCard';
import { useEffect,  } from 'react';
import { getTotals } from '../store/StoreCard';

export const OrderedDish = () => {
    const card = useSelector((state) => state.dishes)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTotals());
      }, [card, dispatch]);
  
    const handleDecreaseCartQuant = (item:any) => {
        dispatch(decreaseCartQuant(item))
    }
    const handleIncreaseCartQuant = (item:any) => {
        dispatch(addToCard(item))
    }

    const handleDelFromCard = (item:any) => {
        dispatch(delFromCard(item))
    }
    console.log(card.dishes)
    return (
        <View style={styles.GreatCont}>
            <ScrollView style={styles.ScrollStyle}>
                {card.dishes.map((item:any) => (
                    <View key = {item.id} style={styles.StyledDish}>
                        <View style={styles.MainCont} >
                            <Image source={{uri:item.photos[0]}} style={styles.Pict}/>
                            <View style={styles.Wrapper}>
                                <View style={styles.TextContainer}>
                                    <Text style={styles.StyledText}>{item.title}</Text>
                                </View>
                                <Text style={styles.changeText}>Изменить состав</Text>
                                <View style={styles.CountCont} >
                                    <Text style={styles.SimpText}>{item.price} BYN</Text>
                                    <View style={styles.Conta}>
                                        <TouchableOpacity onPress={() => handleDecreaseCartQuant(item)}>
                                            <Image style={styles.PictBut1}  source={require('../../img/desMin.png')}/>
                                        </TouchableOpacity>
                                        <Text style={styles.StyledCount}>{item.cardQuantity}</Text>
                                        <TouchableOpacity onPress={() => handleIncreaseCartQuant(item)}>
                                            <Image style={styles.PictBut2} source={require('../../img/desPlus.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    
                    </View>
                ))}
                
                </ScrollView>
            
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    Conta:{
        flexDirection:'row',
        alignItems:'center',
        left:30,
    },
    Pict:{
        resizeMode:'contain',
        width:160,
        height:150,
        backgroundColor:'white',
        borderRadius: 8,
      },
    StyledDish:{
        marginBottom:'5%',
    },
    GreatCont: {
        justifyContent:'space-around',
    },
    MainCont:{
        top: '5%',
        flexDirection: 'row',
        justifyContent:'space-around',
        
    },
    CountCont: {
        alignItems: 'center',
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent:'space-between',
        bottom:'24%',
    },
    TextContainer:{
        
        
        flexDirection: 'row',
        
    },
    StyledText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        top:4,


        paddingRight:15,
        color: '#000000',
    },
    StyledCount: {
        fontSize: 24,
        lineHeight: 40,
        color: '#000000',
    },
    Wrapper: {
        top:'3%',
        right:'30%',
        justifyContent:'space-between',
        flexDirection:'column',
        
    },
    DelPasEng:{
        position:'relative',
        top:100,
        left:20,
    },
    DellText:{
        textAlign:'center',
        width:160,
        borderRadius:10,
        borderWidth:  1,
        marginBottom:20,
        color: '#000000',
    },
    AddText:{
        textAlign:'center',
        width:190,
        borderRadius:10,
        borderWidth:  1,
        color: '#000000',
    },
    SimpText:{
        color: '#000000',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 15,
    },
    ScrollStyle:{
        height:'60%'
    },
    PictBut1:{
        right:5,
        width:25,
        height:25
    },
    PictBut2:{
        left:5,
        width:25,
        height:25
    },
    changeText:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 15,
        color:'#FF4D00',
    }
});


{/*item.price * item.cardQuantity*/}