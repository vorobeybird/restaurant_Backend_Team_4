import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { OrderedDish } from './OrderedDish';

export const MarketMain = () => {

  return (
    <View>
         <View style={styles.PictCont}>
            <Image source={require('../../img/close.png')}/>
            <Image source={require('../../img/bin.png')}/>
        </View>
        <Text style={styles.Header}>Заказ</Text>
        <OrderedDish/>
        <View style={styles.TypeWrapper}>
            <Text style={styles.TextType}>Выберите вид заказа:</Text>
            <View >
                <View style={styles.TypeContainer}>
                    <Image source={require('../../img/car.png')}/>
                    <Text style={styles.SimpText}>  Доставка заказа</Text>
                </View>
            </View>
        </View>
        <View style={styles.FinalCheckCont}>
            <Text style={styles.SimpText}>Итоговая сумма: 18 BYN</Text>
            <Text style={styles.But}>Далее</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    PictCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingLeft: 5,
        paddingRight:5
    },
    Header: {
        top: 50,
        left:'5%',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',

    },
    FoodContainer:{
        top:'20%',
        left:'10%',
    },
    TypeWrapper:{
        top:'30%',
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    TypeContainer:{
        flexDirection:'row',
    },
    FinalCheckCont:{
        width: 341,
        height: 60.43,
        top:'70%',
        flexDirection:'row',
        alignSelf: 'center',
        alignItems:'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        backgroundColor: '#C4C4C433',
    },
    But:{
        width: 100,
        borderWidth: 1,
        textAlign:'center',
        paddingTop:4,
        height:30,
        borderRadius:40,
        backgroundColor:'#99fda9',
        borderColor:'green',
        color: '#000000',
    },
    TextType:{
        width:80,
        color: '#000000',
    },
    SimpText:{
        color: '#000000',
    }
});


