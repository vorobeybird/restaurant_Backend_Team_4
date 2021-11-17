import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from 'react-native';
import {addToCard} from '../store/StoreCard';
import {useDispatch, useSelector} from 'react-redux';

export const DishPage = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {id, title, photos, descr, price, cal, weight} = route.params;
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

  return (
    <View key={id} style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.TitleText}>
          {title}
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
                source={require('../../img/circle.png')}
              />
              <Text key={index} style={styles.SostItem}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.calWrapper}>
        <Image source={require('../../img/fire.png')} />
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
        }}></View>
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

const styles = StyleSheet.create({
  byn: {
    fontSize: 13,
  },
  priceText: {
    top: '13%',
    left: '10%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
  },
  list: {
    flexDirection: 'row',
  },
  listPict: {
    marginRight: 10,
    alignSelf: 'center',
  },
  SostItem: {
    color: '#000000',
  },
  Sostav: {
    color: '#000000',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
  },
  Arrow: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  TitleText: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    marginLeft: 5,
  },
  Title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Header: {
    bottom: '2%',
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  Pict: {
    top: '1%',
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 325,
    height: 265,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  BotText: {
    top: '5%',
    left: '10%',
    flexDirection: 'column',
  },
  Descr: {
    textAlign: 'left',
    color: 'black',
  },
  Wrapper: {
    flex: 1,
    paddingBottom: '50%',
    backgroundColor: 'white',
  },
  Cost: {
    textAlign: 'left',
    color: 'black',
  },
  GoBackWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%',
    height: '12%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButtText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
  Text: {
    color: 'black',
  },
  calWrapper: {
    left: '8%',
    top: '10%',
    flexDirection: 'row',
  },
  textCalWraper: {
    color: 'black',
  },
});
