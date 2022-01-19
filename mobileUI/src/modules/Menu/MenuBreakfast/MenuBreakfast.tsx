import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import Dish from './components/Dish';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ICategory,
  IMenuItem,
  MenuBreakfastScreenNavigationProp,
  MenuBreakfastScreenRouteProp,
} from '../../../navigation/routes/auxillaryNavigators/MenuNavigator';

const MenuBreakfast = () => {
  const route = useRoute<MenuBreakfastScreenRouteProp>();
  const navigation = useNavigation<MenuBreakfastScreenNavigationProp>();

  const {id, title, dish} = route.params;
  const item: ICategory = {
    id,
    title,
    dish,
  };

  return (
    <View style={styles.Scroll}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        renderItem={({item}: {item: IMenuItem}) => {
          const urlArr = item.photos.map((item: any) => item.photo_url);
          return (
            <Dish
              id={item.title}
              title={item.title}
              photos={urlArr}
              descr={item.ingredients}
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
