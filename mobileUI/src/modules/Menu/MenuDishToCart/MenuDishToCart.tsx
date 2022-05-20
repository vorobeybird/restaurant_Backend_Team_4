import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useAppDispatch} from '../../../hooks/hooks';
import {cartActions} from '../../Cart/store/cartStore';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MenuDishToCartScreenNavigationProp,
  MenuDishToCartScreenRouteProp,
} from '../../../navigation/routes/auxillaryNavigators/MenuNavigator';

const MenuDishToCart = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MenuDishToCartScreenNavigationProp>();
  const route = useRoute<MenuDishToCartScreenRouteProp>();

  const {id, title, photo, ingredient, price, cal} = route.params;
  console.log('loggggggggggggggggg', id, ingredient);
  
  const item = {id, title, photo, price, ingredient};

  const handleAddToCard = (item: any) => {
    dispatch(cartActions.addToCart(item));
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        {photo.map((image: any, index: any) => {
          return (
            <Image key={index} style={styles.Pict} source={{uri: image}} />
          );
        })}
      </ScrollView>
      <View style={styles.BotText}>
        <Text style={styles.Sostav}>Состав:</Text>
        {console.log(323435234532453245, ingredient)}
        {ingredient.map((item: any, index: any) => {
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
