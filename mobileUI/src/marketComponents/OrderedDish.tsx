import React from 'react';
import {
    Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'


export const OrderedDish = () => {
    return (
        <View style={styles.GreatCont}>
            <View style={styles.MainCont} >
                    <Image source={require('../../img/food.png')}/>
                    <View style={styles.Wrapper}>
                        <View style={styles.TextContainer}>
                            <Text style={styles.StyledText}>Английский завтрак</Text>
                            <Text style={styles.SimpText}>18 BYN</Text>
                        </View>
                        <View style={styles.CountCont}>
                            <Image source={require('../../img/minus.png')}/>
                            <Text style={styles.StyledCount}>1</Text>
                            <Image source={require('../../img/plus.png')}/>
                        </View>
                    </View>
            </View>
            <View style={styles.DelPasEng} >
                <Text style={styles.DellText}>Убрать ингредиент(ы)</Text>
                <Text style={styles.AddText}>Добавить еще одно блюдо</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    GreatCont: {
        justifyContent:'space-between',
    },
    MainCont:{
        position:'relative',
        top: '20%',
        flexDirection: 'row',
        justifyContent:'space-evenly',
    },
    CountCont: {
        alignItems: 'center',
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent:'space-evenly',
    },
    TextContainer:{
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    StyledText: {
        paddingRight:15,
        color: '#000000',
    },
    StyledCount: {
        fontSize: 36,
        lineHeight: 49,
        color: '#000000',
    },
    Wrapper: {
        flexDirection:'column',
        justifyContent:'space-between',
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
    }
});


