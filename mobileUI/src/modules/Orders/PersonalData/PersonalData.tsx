import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {addUserInfo} from '../../../store/StoreCard';
import {useDispatch} from 'react-redux';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppSelector} from '../../../hooks/hooks';
import styles from './styles';

type RootStackParamList = {
  navigate: any;
};
const nameRegEx = new RegExp('^([а-яА-Я]{2,30})');

const PersonalData = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const user = useAppSelector(state => state.dishes.userInfo.attributes);
  const [state, setState] = useState({
    name: '',
    surName: '',
    phone: '',
  });

  async function updateUserAttributesHandler() {
    try {
      if (user) {
        console.log(user, 'asdfasdfasdfasdfasdf');
        console.log(state);
        const userAmp = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(userAmp, {
          name: state.name,
          family_name: state.surName,
          phone_number: state.phone,
        });
        const updatedUser = await Auth.currentAuthenticatedUser();
        handleAddUserInfo(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useDispatch();

  const [error, setError] = useState({
    name: '',
    surName: '',
    phone: '',
  });

  const handleAddUserInfo = (item: any) => {
    dispatch(addUserInfo(item));
  };
  const required = () => {
    let nameErr, surNameErr, phoneErr;
    if (!state.name) {
      nameErr = 'Введите имя';
    } else if (nameRegEx.test(state.name) === false) {
      nameErr = 'Введите имя';
    } else {
      nameErr = '';
    }
    if (!state.surName) {
      surNameErr = 'Введите фамилию';
    } else if (nameRegEx.test(state.surName) === false) {
      surNameErr = 'Введите фамилию';
    } else {
      surNameErr = '';
    }
    if (!state.phone) {
      phoneErr = 'Введите телефон';
    } else {
      phoneErr = '';
    }
    setError({name: nameErr, surName: surNameErr, phone: phoneErr});
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
        <Text style={styles.TitleText}>Личные данные</Text>
      </View>
      <View style={styles.Wrap}>
        <Text style={styles.simpText}> Имя </Text>
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Имя"
          onChangeText={val => setState({...state, name: val})}
        />
        <Text style={styles.error}> {error.name} </Text>
        <Text style={styles.simpText}> Фамилия </Text>
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Фамилия"
          onChangeText={val => setState({...state, surName: val})}
        />
        <Text style={styles.error}> {error.surName} </Text>
        <Text style={styles.simpText}> Телефон </Text>
        <TextInput
          placeholderTextColor="#C6C6C6"
          style={styles.street}
          placeholder="Телефон"
          onChangeText={val => setState({...state, phone: val})}
        />
      </View>
      <Text style={styles.error}> {error.phone} </Text>
      <TouchableOpacity
        style={styles.butStyle}
        onPress={() => {
          required();
          if (
            nameRegEx.test(state.name) === false ||
            nameRegEx.test(state.surName) === false
          ) {
            required();
          } else if (state.name && state.surName && state.phone) {
            updateUserAttributesHandler();
            navigation.navigate(ScreenNames.ProfileMain);
          }
        }}>
        <Text style={styles.ButText}> ГОТОВО </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalData;
