import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useState} from 'react';

import {useDispatch} from 'react-redux';
import {addCard} from '../../../store/StoreCard';
import styles from './styles';

const ProfileAddCard = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [card, setCard] = useState({
    num: '',
    live: '',
    cvv: '',
    name: '',
    id: 1,
    type: '',
  });
  const dispatch = useDispatch();
  const handleProfileAddCard = (item: any) => {
    dispatch(addCard(item));
  };
  const regexSixteen = new RegExp('^[0-9]{16}$');
  const regexCvv = new RegExp('^[0-9]{3}$');
  const regexDate = new RegExp('^(0[1-9]|1[0-2])/[0-9]{2}');
  const [error, setError] = useState({
    sixTeen: '',
    Cvv: '',
    Date: '',
  });
  const required = () => {
    let sixTeenErr, CvvErr, DateErr;
    if (!card.num) {
      sixTeenErr = 'Введите номер карты';
    } else if (regexSixteen.test(card.num) === false) {
      sixTeenErr = 'Введите номер карты';
    } else {
      sixTeenErr = '';
    }
    if (!card.cvv) {
      CvvErr = 'Введите код CVV';
    } else if (regexSixteen.test(card.cvv) === false) {
      CvvErr = 'Введите код CVV';
    } else {
      CvvErr = '';
    }
    if (!card.live) {
      DateErr = 'Введите месяц/год';
    } else if (regexDate.test(card.live) === false) {
      DateErr = 'Введите месяц/год';
    } else {
      DateErr = '';
    }
    setError({sixTeen: sixTeenErr, Cvv: CvvErr, Date: DateErr});
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Карта добавлена',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
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
        <Text style={styles.TitleText}> Добавить карту</Text>
      </View>
      <View style={styles.mainWrapper}>
        <Text style={styles.textNumber}>Номер карты</Text>
        <Image
          style={styles.CardPict}
          source={require('../../../../img/myCard.png')}
        />
        <TextInput
          style={styles.number}
          placeholder="1234 1234 1234"
          onChangeText={val => {
            setCard({...card, num: val});
          }}
        />
        <Text style={styles.errorNum}>{error.sixTeen}</Text>
        <View style={styles.inpCont}>
          <View style={styles.col}>
            <Text style={styles.textLive}>Срок действия</Text>
            <TextInput
              style={styles.live}
              placeholder="MM/YY"
              onChangeText={val => setCard({...card, live: val})}
            />
            <Text style={styles.errorStreet}>{error.Date}</Text>
          </View>
          <View>
            <Text style={styles.textLiveCvv}>CVV/CVC</Text>
            <TextInput
              style={styles.Cvv}
              placeholder="***"
              onChangeText={val => setCard({...card, cvv: val})}
            />
            <Text style={styles.errorCvv}>{error.Cvv}</Text>
          </View>
        </View>
        <Text style={styles.textName}>Имя владельца карты</Text>
        <TextInput
          style={styles.Name}
          placeholder="Имя владельца карты"
          onChangeText={val => setCard({...card, name: val})}
        />
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          if (
            card.num != '' &&
            card.cvv != '' &&
            card.live != '' &&
            regexSixteen.test(card.num) === true &&
            regexCvv.test(card.cvv) === true &&
            regexDate.test(card.live) === true
          ) {
            handleProfileAddCard(card);
            showToast();
            goBack();
          } else {
            required();
          }
        }}>
        <Text style={styles.ButText}> Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAddCard;
