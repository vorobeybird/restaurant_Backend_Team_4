import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {delAdress} from '../store/StoreCard';
import {Card} from 'react-native-elements';

type RootStackParamList = {
  AddAdress: undefined;
  navigate: any;
};

export const MyAdress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.dishes);
  const handleDelAdress = (item: string) => {
    dispatch(delAdress(item));
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Адрес доставки</Text>
      </View>
      {cart.adress.length === 0 ? (
        <View style={styles.EmptyTextWrapper}>
          <Text style={styles.EmptyText}>
            Похоже, вы пока не добавили адрес
          </Text>
        </View>
      ) : (
        <View>
          {cart.adress.map((item: any) => {
            console.log(item);
            return (
              <View key={item.id} style={styles.FullWrapper}>
                <Text style={styles.Text}>
                  ул. {item.str}, д. {item.house}, кв. {item.kv}
                </Text>
                <TouchableOpacity onPress={() => handleDelAdress(item)}>
                  <Image
                    source={require('../../img/bin.png')}
                    style={styles.Pict}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
      {cart.adress.length === 0 ? (
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('AddAdress')}>
          <Text style={styles.ButText}> Добавить адрес</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  EmptyTextWrapper: {
    justifyContent: 'center',
    top: '30%',
  },
  FullWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '5%',
    top: '5%',
    borderRadius: 10,
    width: '90%',
    elevation: 10,
    height: 70,
    backgroundColor: 'white',
  },
  Text: {
    top: 20,
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  Pict: {
    top: 20,
    marginRight: 30,
  },
  EmptyText: {
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
  },
  Title: {
    flexDirection: 'row',
    height: '9%',
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Arrow: {
    top: '26%',
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  Button: {
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
