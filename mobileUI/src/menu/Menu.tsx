import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Image} from 'react-native-elements/dist/image/Image';
import axios from 'axios';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements/dist/input/Input';
import {useSelector} from 'react-redux';
import {transform} from '@babel/core';

export type RootStackParamList = {
  MainMenu: undefined;
  Breakfast: undefined;
  MenuTabNavigation: undefined;
  BarMenu: undefined;
  WeekCatch: undefined;
  navigate: any;
};

interface category {
  id: number;
  title: string;
  dish: [];
}

export const Menu = () => {
  const [date, setDate] = useState({} as any);
  const getItems = async () => {
    const response = await axios.get<category[]>(
      'http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/category',
    );
    const res = response.data;
    return res;
  };
  const fetchMenuItems = async () => {
    const items = await getItems();
    setDate(items);
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
        if (!unicDishes.includes(dish)) unicDishes.push(dish);
      });
    });

    unicDishes = uniqueProps(unicDishes);

    let itHas = false;
    unicDishes.forEach((dish: any) => {
      //   console.log(dish.title);
      if (
        dish.title.toUpperCase().startsWith(searchInputValue.toUpperCase()) &&
        searchInputValue !== ''
      )
        itHas = true;
    });
    console.log(itHas);
    return itHas;
  };

  //   const a = useSelector(state => state);
  //   console.log(a);

  const showDishes = () => {
    let unicDishes = [] as any;

    date.forEach((item: any) => {
      item.dish.forEach((dish: any) => {
        if (!unicDishes.includes(dish)) unicDishes.push(dish);
      });
    });

    unicDishes = uniqueProps(unicDishes);

    return unicDishes
      .filter((dish: any) => {
        console.log(
          dish.title.toUpperCase(),
          searchInputValue.toUpperCase(),
          'hi',
        );
        return dish.title
          .toUpperCase()
          .startsWith(searchInputValue.toUpperCase());
      })
      .map((dish: any) => {
        console.log(dish.title, 'cum');

        const newDish = {
          id: dish.id,
          title: dish.title,
          photos: dish.photo,
          descr: dish.ingredient,
          price: dish.price,
          calories: dish.calories,
          weight: dish.weight,
        };

        return (
          <Text
            style={styles.CategoryFromList}
            onPress={() => navigation.navigate('DishPage', {...newDish})}>
            {dish.title}
          </Text>
        );
      });
  };

  const includesSuchCategory = () => {
    let categories = date.map((item: any) => item.title);
    let itHas = false;
    categories.forEach((category: string) => {
      if (
        category.toUpperCase().startsWith(searchInputValue.toUpperCase()) &&
        searchInputValue !== ''
      )
        itHas = true;
    });
    return itHas;
  };

  const showCategories = () => {
    let categories = date.map((item: any) => item.title);
    return categories
      .filter((category: string) =>
        category.toUpperCase().startsWith(searchInputValue.toUpperCase()),
      )
      .map((category: string) => {
        let currentItem = date.filter((item: any) => item.title === category);
        return (
          <Text
            style={styles.CategoryFromList}
            onPress={() =>
              navigation.navigate('Breakfast', {...currentItem[0]})
            }>
            {category}
          </Text>
        );
      });
  };

  const uniqueProps = (a: any) => {
    if (!a) return [];
    let seen = {} as any;
    return a.filter((x: any) => {
      var key = JSON.stringify(x);
      return !(key in seen) && (seen[key] = x);
    });
  };

  const navigation = useNavigation<RootStackParamList>();
  return (
    <View style={styles.Wrapper}>
      <View style={styles.HedWrap}>
        <Text style={styles.Header}>Меню</Text>
        <View style={styles.SearchInput}>
          {searchIsPressed && (
            <>
              <Input
                onChangeText={setSearchInputValue}
                value={searchInputValue}></Input>
              {includesSuchCategory() && (
                <View style={styles.CategoriesList}>{showCategories()}</View>
              )}
              {includesSuchDish() && <View>{showDishes()}</View>}
            </>
          )}
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <Image style={styles.Pict} source={require('../../img/scop.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.FoodContainer}
        data={date}
        renderItem={({item}) => {
          return (
            <Text
              style={styles.FoodLinks}
              id={item.id}
              onPress={() => navigation.navigate('Breakfast', {...item})}>
              {item.title}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  Header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33,
    color: '#000000',
  },
  HedWrap: {
    height: '15%',
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SearchInput: {
    position: 'relative',
    zIndex: 9,
    width: 200,
  },
  CategoriesList: {
    position: 'absolute',
    top: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    zIndex: 9,
    backgroundColor: '#FFEFD5',
  },
  CategoryFromList: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    color: '#000000',
    marginBottom: 3,
    marginTop: 3,
    zIndex: 9,
  },
  FoodLinks: {
    paddingBottom: 10,
    top: 10,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33,
    color: '#000000',
  },
  Pict: {
    width: 24,
    height: 24,
  },
  FoodContainer: {
    flexGrow: 1,
    top: '2%',
    left: '10%',
    zIndex: -1,
  },
});
