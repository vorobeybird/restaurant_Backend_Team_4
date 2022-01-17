import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {delAdress} from '../../../store/StoreCard';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppSelector} from '../../../hooks/hooks';
import styles from './styles';

type RootStackParamList = {
  AddAdress: undefined;
  navigate: any;
};

const ProfileAddress = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useDispatch();
  const cart = useAppSelector(state => state.dishes);
  const handleDelAdress = (item: string) => {
    dispatch(delAdress(item));
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
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
                    source={require('../../../../img/bin.png')}
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
          onPress={() => navigation.navigate(ScreenNames.AddAdress)}>
          <Text style={styles.ButText}> Добавить адрес</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ProfileAddress;
