import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {addToCard} from '../../../store/StoreCard';
import {useDispatch} from 'react-redux';
import styles from './styles';

const MenuDishToCart = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {id, title, photos, descr, price, cal} = route.params;
  console.log(route.params);
  const item = {id, title, photos, price, descr};
  const dispatch = useDispatch();

  const handleAddToCard = (item: any) => {
    dispatch(addToCard(item));
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Блюдо добавлено в корзину',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  let newTitle;
  if (item.title.length > 7) {
    let name = item.title.substr(0, 20);
    newTitle = name + '...';
    console.log(newTitle);
  } else {
    newTitle = item.title;
  }
  return (
    <View key={id} style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.TitleText}>
          {newTitle}
        </Text>
      </View>
      <ScrollView pagingEnabled horizontal style={styles.Pict}>
        {photos.map((image: any, index: any) => {
          return (
            <Image key={index} style={styles.Pict} source={{uri: image}} />
          );
        })}
      </ScrollView>
      <View style={styles.BotText}>
        <Text style={styles.Sostav}>Состав:</Text>

        {descr.map((item: any, index: any) => {
          return (
            <View key={index} style={styles.list}>
              <Image
                style={styles.listPict}
                source={require('../../../../img/circle.png')}
              />
              <Text key={index} style={styles.SostItem}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.calWrapper}>
        <Image source={require('../../../../img/fire.png')} />
        <Text style={styles.textCalWraper}> {cal} Ккал</Text>
      </View>
      <View
        style={{
          left: '10%',
          top: '10%',
          width: '80%',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: 1,
          borderColor: '#C4C4C4',
        }}
      />
      <Text style={styles.priceText}>
        {price} <Text style={styles.byn}>BYN</Text>
      </Text>
      <View style={styles.ButtonWrapper}>
        <TouchableOpacity
          onPress={() => {
            handleAddToCard(item);
            showToast();
          }}>
          <Text style={styles.ButtText}> ДОБАВИТЬ В КОРЗИНУ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuDishToCart;
