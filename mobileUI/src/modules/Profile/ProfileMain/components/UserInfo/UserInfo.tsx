import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../../../navigation/ScreenNames';
import {useAppSelector} from '../../../../../hooks/hooks';
import styles from './styles';

type RootStackParamList = {
  PersonalData: undefined;
  navigate: any;
};
const UserInfo = () => {
  const navigation = useNavigation<RootStackParamList>();
  const cart = useAppSelector(state => state.dishes);
  console.log(cart);
  const user = useAppSelector(state => state.dishes.userInfo.attributes);
  let email;
  let name;
  let familyName;
  let phoneNumber;
  if (user) {
    email = user.email;
    name = user.name;
    familyName = user.family_name;
    phoneNumber = user.phone_number;
  }
  return (
    <View style={styles.MainCont}>
      <View style={styles.Conts}>
        <Text style={styles.Header}>
          {name} {familyName}
        </Text>
        <Text style={styles.Email}>{email}</Text>
        <Text style={styles.Phone}>{phoneNumber}</Text>
        <TouchableOpacity
          style={styles.ButCont}
          onPress={() => {
            navigation.navigate(ScreenNames.PersonalData);
          }}>
          <Text style={styles.ButText}>Изменить {'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfo;
