import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

export type RootStackParamList = {
    ProfileComponent: undefined;
    MarketMain: undefined;
    Menu: undefined;
    Breakfast: undefined;
    MenuTabNavigation: undefined;
    Lunch: undefined;
    Snacks: undefined;
    Soup: undefined;
    Salads: undefined;
    Pasta: undefined;
    Pizza: undefined;
    Sushi: undefined;
    Desserts: undefined;
    navigate: any;
};

export const Menu = () => {

    const navigation = useNavigation<RootStackParamList>();
    return (
        <View>
            <Text style={styles.Header}>Меню</Text>
            <View style={styles.FoodContainer}>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Breakfast')} >Breakfast</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Lunch')} >Lunch</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Snacks')} >Snacks</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Soup')} >Soup</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Salads')} >Salads</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Pasta')} >Pasta</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Pizza')} >Pizza</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Sushi')} >Sushi</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Desserts')} >Desserts</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Header: {
        top: '10%',
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        textAlign: 'center',
        color: '#000000',

    },
    FoodLinks: {
        paddingBottom: 10,
        top: 10,
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',

    },
    FoodContainer: {
        top: '20%',
        left: '10%',
    }
});


