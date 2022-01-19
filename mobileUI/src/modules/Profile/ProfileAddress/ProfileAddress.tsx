import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {authActions} from '../../Auth/store/authStore';

type RootStackParamList = {
  ProfileAddress: undefined;
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);

  const handleDelAddress = (item: string) => {
    dispatch(authActions.delAddress(item));
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
      {user.address.length === 0 ? (
        <View style={styles.EmptyTextWrapper}>
          <Text style={styles.EmptyText}>
            Похоже, вы пока не добавили адрес
          </Text>
        </View>
      ) : (
        <View>
          {user.address.map((item: any) => {
            console.log(item);
            return (
              <View key={item.id} style={styles.FullWrapper}>
                <Text style={styles.Text}>
                  ул. {item.str}, д. {item.house}, кв. {item.kv}
                </Text>
                <TouchableOpacity onPress={() => handleDelAddress(item)}>
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
      {user.address.length === 0 ? (
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate(ScreenNames.ProfileAddress)}>
          <Text style={styles.ButText}> Добавить адрес</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ProfileAddress;
