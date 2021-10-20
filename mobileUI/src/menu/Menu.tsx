import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'

export type RootStackParamList = {
<<<<<<< HEAD
    MainMenu: undefined;
    Breakfast: undefined;
    MenuTabNavigation: undefined;
=======
    ProfileComponent: undefined;
    MarketMain: undefined;
    Menu: undefined;
    MenuTabNavigation: undefined;
    Breakfast: undefined;
    MainMenu: undefined;
>>>>>>> dev
    BarMenu: undefined;
    WeekCatch: undefined;
    navigate: any;
};

export const Menu = () => {
    const navigation = useNavigation<RootStackParamList>();
    return (
        <View>
            <Text style={styles.Header}>Меню</Text>
            <View style={styles.FoodContainer}>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('Breakfast')} >Завтраки</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('MainMenu')} >Основное меню</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('BarMenu')} >Меню бара</Text>
                <Text style={styles.FoodLinks} onPress={() => navigation.navigate('WeekCatch')} >Улов недели</Text>
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
        fontWeight: 'bold',
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


