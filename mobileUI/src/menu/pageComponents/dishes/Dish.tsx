import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export const Dish = ({ el } : {el: any}) => {
    return (
        <TouchableOpacity style={styles.DishWrapper}>
            <View style={styles.Dish}>
                <Text>{el.name}</Text>
                <Image source={require('../../../../img/food.png')}></Image>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    DishWrapper: {
        display: "flex",
        width: "100%"
    },
    Dish: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});