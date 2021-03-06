import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import styles from './styles';
import {authActions} from '../../Auth/store/authStore';

type RootStackParamList = {
  AddCard: undefined;
  navigate: any;
};

const ProfileCards = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);

  const handleDelCard = (item: string) => {
    dispatch(authActions.delCard(item));
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
        <Text style={styles.TitleText}>Мои карты</Text>
      </View>
      {user.card.length === 0 ? (
        <View style={styles.EmptyTextWrapper}>
          <Text style={styles.EmptyText}>
            Похоже, вы пока не добавили карту
          </Text>
        </View>
      ) : (
        <View>
          {user.card.map((item: any) => {
            console.log(item);
            return (
              <View key={item.id} style={styles.FullWrapper}>
                {item.type == 'visa' ? (
                  <Image
                    style={styles.typeImg}
                    source={require('../../../../img/visa.png')}
                  />
                ) : (
                  <Image
                    style={styles.typeImg}
                    source={require('../../../../img/mastercard.png')}
                  />
                )}
                <View style={styles.fullContainer}>
                  <Text style={styles.simpText}>{item.num}</Text>
                  <Text style={styles.simpText}>{item.live}</Text>
                  <Text style={styles.simpText}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelCard(item)}>
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
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.navigate(ScreenNames.ProfileAddCard);
        }}>
        <Text style={styles.ButText}> Добавить карту</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCards;
