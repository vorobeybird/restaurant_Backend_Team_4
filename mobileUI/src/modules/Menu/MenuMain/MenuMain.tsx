import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, FlatList} from 'react-native';
import {Image} from 'react-native-elements/dist/image/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements/dist/input/Input';
import Api from '../../../apiSecure/Api';
import ScreenNames from '../../../navigation/ScreenNames';
import styles from './styles';
import {
  ICategory,
  INewDish,
  MenuMainScreenNavigationProp,
} from '../../../navigation/routes/auxillaryNavigators/MenuNavigator';
// require('dotenv').config()

const PATH = process.env.REACT_APP_GET_DISHES

const MenuMain = () => {
  const navigation = useNavigation<MenuMainScreenNavigationProp>();

  const [date, setDate] = useState<ICategory[]>([]);

  const getItems = async () => {
    
    const response = await Api.get<ICategory[]>(
      `http://3.70.133.63:5000/api/category/`,
    );
    console.log(response.data)
    const res = response.data;
    return res;
  };
  const fetchMenuItems = async () => {
    
    const items = await getItems();
    console.log(items);
    
    const arr = [] as ICategory[];
    items.map(item => {
      if (item.show_in_menu) {
        arr.push(item);
      }
    });
    setDate(arr);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const [searchIsPressed, setSearchIsPressed] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSearch = () => {
    setSearchIsPressed(!searchIsPressed);
    setSearchInputValue('');
  };

  const includesSuchDish = () => {
    let unicDishes = [] as any;

    date.forEach((item: any) => {
      item.dish.forEach((dish: any) => {
        if (!unicDishes.includes(dish)) {
          unicDishes.push(dish);
        }
      });
    });

    unicDishes = uniqueProps(unicDishes);

    let itHas = false;
    unicDishes.forEach((dish: any) => {
      if (
        dish.title.toUpperCase().startsWith(searchInputValue.toUpperCase()) &&
        searchInputValue !== ''
      ) {
        itHas = true;
      }
    });
    return itHas;
  };

  const showDishes = () => {
    let unicDishes = [] as any;

    date.forEach((item: any) => {
      item.dish.forEach((dish: any) => {
        if (!unicDishes.includes(dish)) {
          unicDishes.push(dish);
        }
      });
    });

    unicDishes = uniqueProps(unicDishes);

    return unicDishes
      .filter((dish: any) => {
        return dish.title
          .toUpperCase()
          .startsWith(searchInputValue.toUpperCase());
      })
      .map((dish: any) => {
        console.log('agnst', dish.ingredient);
        
        const photo = dish.photo;
        const urlArr = photo.map((item: any) => item.photo_url);

        const newDish: INewDish = {
          id: dish.id,
          title: dish.title,
          photo: urlArr,
          ingredient: dish.ingredient,
          price: dish.price,
          cal: dish.calories,
          weight: dish.weight,
        };

        return (
          <Text
            style={styles.CategoryFromList}
            onPress={() =>
              navigation.navigate(ScreenNames.MenuDishToCart, {...newDish})
            }>
            {dish.title}
          </Text>
        );
      });
  };

  const uniqueProps = (a: any) => {
    if (!a) {
      return [];
    }
    let seen = {} as any;
    return a.filter((x: any) => {
      var key = JSON.stringify(x);
      return !(key in seen) && (seen[key] = x);
    });
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.HedWrap}>
        <Text style={styles.Header}>Меню</Text>
        <View style={styles.SearchInput}>
          {searchIsPressed && (
            <>
              <Input
                onChangeText={setSearchInputValue}
                value={searchInputValue}
              />

              {includesSuchDish() && (
                <View style={styles.CategoriesList}>{showDishes()}</View>
              )}
            </>
          )}
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <Image
            style={styles.Pict}
            source={require('../../../../img/scop.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.FoodContainer}
        data={date}
        renderItem={({item}) => {
          return (
            <Text
              style={styles.FoodProfileLinks}
              onPress={() =>
                navigation.navigate(ScreenNames.MenuBreakfast, {...item})
              }>
              {item.title}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default MenuMain;