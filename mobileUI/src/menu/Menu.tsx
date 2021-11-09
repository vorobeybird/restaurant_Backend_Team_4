import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Image } from 'react-native-elements/dist/image/Image';
import axios from "axios"
import { ScrollView } from 'react-native-gesture-handler';

export type RootStackParamList = {
    MainMenu: undefined;
    Breakfast: undefined;
    MenuTabNavigation: undefined;
    BarMenu: undefined;
    WeekCatch: undefined;
    navigate: any;
};

interface category {
    id: number;
    title:string;
    dish:[]
  }

export const Menu = () => {
    const [date, setDate] = useState({} as any);
    const getItems = async () => {
        const response = await axios.get<category[]>('http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/category')
        const res = response.data
        return res
      }
      const fetchMenuItems = async () => {
        const items = await getItems()
        setDate(items)
        
      }
    
      
      useEffect(() => {
        fetchMenuItems()
        
      },[])

    const navigation = useNavigation<RootStackParamList>();
    return (
        <View style={styles.Wrapper}>
            <View style={styles.HedWrap}>
                <Text style={styles.Header}>Меню</Text>
                <Image style={styles.Pict} source={require('../../img/scop.png')}/>
            </View>
           
            <FlatList 
            style={styles.FoodContainer}
            data={date}
            renderItem={({ item }) => { 
              return (
                <Text style={styles.FoodLinks} id={item.id} onPress={()=> navigation.navigate('Breakfast', { ...item })}>{item.title}</Text>
            )}}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    Wrapper:{
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
        flexGrow: 1,
        top: '5%',
        left: '10%',
    }
});


