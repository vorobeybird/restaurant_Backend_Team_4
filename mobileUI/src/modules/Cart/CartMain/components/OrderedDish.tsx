import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {
  delFromCard,
  decreaseCartQuant,
  addToCard,
} from '../../../../store/StoreCard';
import {useEffect} from 'react';
import {getTotals} from '../../../../store/StoreCard';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../../navigation/ScreenNames';
import {useAppSelector} from '../../../../hooks/hooks';
import styles from './OrderedDishStyles';

type RootStackParamList = {
  OrderIngredients: undefined;
  navigate: any;
};

const OrderedDish = () => {
  const navigation = useNavigation<RootStackParamList>();
  const card = useAppSelector(state => state.dishes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [card, dispatch]);

  const handleDecreaseCartQuant = (item: any) => {
    dispatch(decreaseCartQuant(item));
  };
  const handleIncreaseCartQuant = (item: any) => {
    dispatch(addToCard(item));
  };

  // const handleDelFromCard = (item: any) => {
  //   dispatch(delFromCard(item));
  // };
  return (
    <View style={styles.GreatCont}>
      <ScrollView style={styles.ScrollStyle}>
        {card.dishes.map((item: any) => {
          let newTitle;
          if (item.title.length > 7) {
            let name = item.title.substr(0, 13);
            newTitle = name + '...';
            console.log(newTitle);
          } else {
            newTitle = item.title;
            console.log(newTitle);
          }
          return (
            <View key={item.id} style={styles.StyledDish}>
              <View style={styles.MainCont}>
                <Image source={{uri: item.photos[0]}} style={styles.Pict} />
                <View style={styles.Wrapper}>
                  <View style={styles.TextContainer}>
                    <Text style={styles.StyledText}>{newTitle}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(ScreenNames.OrderIngredients, {item})
                    }>
                    <Text style={styles.changeText}>Изменить состав</Text>
                  </TouchableOpacity>
                  <View style={styles.CountCont}>
                    <Text style={styles.SimpText}>{item.price} BYN</Text>
                    <View style={styles.Conta}>
                      <TouchableOpacity
                        onPress={() => handleDecreaseCartQuant(item)}>
                        <Image
                          style={styles.PictBut1}
                          source={require('../../../../../img/desMin.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.StyledCount}>
                        {item.cardQuantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleIncreaseCartQuant(item)}>
                        <Image
                          style={styles.PictBut2}
                          source={require('../../../../../img/desPlus.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OrderedDish;
