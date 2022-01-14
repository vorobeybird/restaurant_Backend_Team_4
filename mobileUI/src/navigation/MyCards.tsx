import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {delCard} from '../store/StoreCard';
import ScreenNames from './ScreenNames';
import { useAppSelector } from '../hooks/hooks';

type RootStackParamList = {
  AddCard: undefined,
  navigate: any;
};

export const MyCards = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.dishes);
  const handleDelCard = (item: string) => {
    dispatch(delCard(item));
  };
  console.log(cart.card);
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Мои карты</Text>
      </View>
      {cart.card.length === 0 ? (
        <View style={styles.EmptyTextWrapper}>
          <Text style={styles.EmptyText}>
            Похоже, вы пока не добавили карту
          </Text>
        </View>
      ) : (
        <View>
          {cart.card.map((item: any) => {
            console.log(item);
            return (
              <View key={item.id} style={styles.FullWrapper}>
                {item.type == 'visa' ? (
                  <Image
                    style={styles.typeImg}
                    source={require('../../img/visa.png')}
                  />
                ) : (
                  <Image
                    style={styles.typeImg}
                    source={require('../../img/mastercard.png')}
                  />
                )}
                <View style={styles.fullContainer}>
                  <Text style={styles.simpText}>{item.num}</Text>
                  <Text style={styles.simpText}>{item.live}</Text>
                  <Text style={styles.simpText}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelCard(item)}>
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
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.navigate(ScreenNames.AddCard);
        }}>
        <Text style={styles.ButText}> Добавить карту</Text>
      </TouchableOpacity>
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
  EmptyText: {
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
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
    height: 100,
    backgroundColor: 'white',
  },
  Text: {
    top: 20,
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  fullContainer: {
    top: '5%',
  },
  simpText: {
    color: 'black',
  },
  typeImg: {
    top: '10%',
    left: 10,
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
  Pict: {
    top: 35,
    marginRight: 30,
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
    top: '80%',
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
