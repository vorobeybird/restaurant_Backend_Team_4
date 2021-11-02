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

export const OrderedDish = () => {
    const card = useSelector((state) => state.dishes)
    const dispatch = useDispatch()
    const handleDecreaseCartQuant = (item:any) => {
        dispatch(decreaseCartQuant(item))
    }
    const handleIncreaseCartQuant = (item:any) => {
        dispatch(addToCard(item))
    }

    const handleDelFromCard = (item:any) => {
        dispatch(delFromCard(item))
    }
    return (
        <View style={styles.GreatCont}>
            {card.dishes.length === 0 ? (
                <Text style={styles.SimpText}>Корзина пуста</Text>
            ): (
            <ScrollView style={styles.ScrollStyle}>
                {card.dishes.map((item:any) => (
                    <View key = {item.id} style={styles.StyledDish}>
                    <View style={styles.MainCont} >
                    <Image source={{uri:item.photos[0]}} style={styles.Pict}/>
                    <View style={styles.Wrapper}>
                        <View style={styles.TextContainer}>
                            <Text style={styles.StyledText}>{item.title}</Text>
                            <Text style={styles.SimpText}>{item.price} BYN</Text>
                        </View>
                        <View style={styles.CountCont} >
                            <TouchableOpacity onPress={() => handleDecreaseCartQuant(item)}>
                                <Image  source={require('../../img/minus.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.StyledCount}>{item.cardQuantity}</Text>
                            <TouchableOpacity onPress={() => handleIncreaseCartQuant(item)}>
                                <Image source={require('../../img/plus.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                    <View style={styles.DelPasEng} >
                    <Text onPress={() => handleDelFromCard(item)} style={styles.DellText}>Убрать блюдо</Text>
                    <Text style={styles.AddText}>Добавить еще одно блюдо</Text>
                    </View>
                    </View>
                ))}
                
                </ScrollView>
            
            )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    Pict:{
        resizeMode:'contain',
        width:150,
        height:100,
        backgroundColor:'white'
      },
    StyledDish:{

        marginBottom:100
    },
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
    },
    ScrollStyle:{
        height:'60%'
    }
});


{/*<View style={styles.MainCont} >
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
</View>*/}