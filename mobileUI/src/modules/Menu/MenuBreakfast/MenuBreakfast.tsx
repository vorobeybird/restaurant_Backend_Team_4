import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import Dish from './components/Dish';
import styles from './styles';

interface MenuItem {
  title: string;
  default_ingredients: string;
  ingredients: number[];
  price: number;
  weight: number;
  categories: number[];
  calories: number;
  photo: string;
  data: any;
}
const MenuBreakfast = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {id, title, dish} = route.params;
  const item = {
    id,
    title,
    dish,
  };

  return (
    <View style={styles.Scroll}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>{item.title}</Text>

        <Image
          style={styles.Scope}
          source={require('../../../../img/scop.png')}
        />
      </View>
      <FlatList
        style={styles.Flat}
        data={item.dish}
        renderItem={({item}) => {
          const photos = item.photo;
          const urlArr = photos.map((item: any) => item.photo_url);
          return (
            <Dish
              id={item.id}
              title={item.title}
              photos={urlArr}
              descr={item.ingredient}
              price={item.price}
              cal={item.calories}
              weight={item.weight}
            />
          );
        }}
      />
    </View>
  );
};

export default MenuBreakfast;
