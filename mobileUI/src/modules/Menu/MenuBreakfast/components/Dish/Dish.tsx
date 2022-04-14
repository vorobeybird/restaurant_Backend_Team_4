import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../../../navigation/ScreenNames';
import styles from './styles';

type RootStackParamList = {
  MenuDishToCartNavigation: undefined;
  MenuDishToCart: undefined;
  navigate: any;
};

const Dish = ({
  id,
  title,
  photos,
  descr,
  price,
  cal,
  weight,
}: {
  id: any;
  title: any;
  photos: any;
  descr: any;
  price: any;
  cal: any;
  weight: any;
}) => {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenNames.MenuDishToCart, {
          id,
          title,
          photos,
          descr,
          price,
          cal,
          weight,
        })
      }>
      <View key={id} style={styles.Wrapper}>
        <ScrollView pagingEnabled horizontal style={styles.Pict}>
          {photos.map((image: any, index: any) => {
            return (
              <Image key={index} style={styles.Pict} source={{uri: image}} />
            );
          })}
        </ScrollView>
        <View style={styles.BotText}>
          <Text style={styles.Header}>{title}</Text>
          <View style={styles.btCont}>
            <Text style={styles.Cost}>
              {price} <Text style={styles.Header}>BYN</Text>
            </Text>
            <Text style={styles.Descr}> {weight} г</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Dish;
