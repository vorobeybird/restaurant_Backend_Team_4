import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements/dist/image/Image';

export type RootStackParamList = {
    MainMenu: undefined;
    Breakfast: undefined;
    MenuTabNavigation: undefined;
    BarMenu: undefined;
    WeekCatch: undefined;
    navigate: any;
};

export const Menu = () => {
    const navigation = useNavigation<RootStackParamList>();
    return (
        <View style={styles.Wrapper}>
            <View style={styles.HedWrap}>
                <Text style={styles.Header}>Меню</Text>
                <Image style={styles.Pict} source={require('../../img/scop.png')}/>
            </View>
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
    Wrapper:{
        flex:1,
        backgroundColor:'white',
    },
    Header: {
        
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',
    },
    HedWrap:{
        width:'100%',
        height:'8%',
        paddingLeft:'5%',
        paddingRight:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#F4F4F4',
    },
    FoodLinks: {
        paddingBottom: 10,
        top: 10,
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',
    },
    Pict:{
        width:24,
        height:24
    },
    FoodContainer: {
        top: '5%',
        left: '10%',
    }
});


