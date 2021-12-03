import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-elements/dist/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addExcludedIngredients} from '../store/StoreCard';

type RootStackParamList = {
  ChangeDishIngr: undefined;
  navigate: any;
};

export const ChangeDishIngr = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  const initialOptionalIngred = {} as any;

  initialOptionalIngred.dish_title = item.title;

  item.descr
    .filter((ingredient: any) => {
      return !ingredient.DishIngredient.is_default;
    })
    .forEach((ingredient: any) => {
      initialOptionalIngred[ingredient.id] = true;
    });

  const [optionalIngred, setOptionalIngred] = useState(initialOptionalIngred);

  const toggleSwitch = (id: number) => {
    setOptionalIngred((prevState: any) => {
      return {...prevState, [id]: !prevState[id]};
    });
  };

  const cart = useSelector(state => state.dishes);

  const findExcludedIngredients = () => {
    let excludedIngredients = item.descr.filter((ingredient: any) => {
      return !ingredient.DishIngredient.is_default;
    });
    excludedIngredients = excludedIngredients.filter((ingredient: any) => {
      return !optionalIngred[ingredient.id];
    });
    excludedIngredients = excludedIngredients.map((ingredient: any) => {
      return ingredient.title;
    });
    excludedIngredients = excludedIngredients.join(', ');
    return {title: item.title, excludedIngredients: excludedIngredients};
  };

  const handleAddExcludedIngredients = () => {
    dispatch(addExcludedIngredients(findExcludedIngredients()));
    navigation.navigate('MarketMain');
  };

  const navigation = useNavigation<RootStackParamList>();

  useEffect(() => {
    item?.descr.forEach((ingredient: any) => {
      setOptionalIngred((prevState: any) => {
        return {
          ...prevState,
          [ingredient.id]: !item.excluded_ingredients
            ? true
            : !item.excluded_ingredients.includes(ingredient.title),
        };
      });
    });
  }, []);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> Изменить состав </Text>
      </View>
      <Text style={styles.DishTitle}>{item.title}</Text>
      <View style={styles.Ingredients}>
        {item.descr.map((ingredient: any) => {
          return ingredient.DishIngredient.is_default ? (
            <Text
              style={[styles.IngredientTitle, styles.IngredientTitleMargin]}
              key={ingredient.id}>
              {ingredient.title}
            </Text>
          ) : (
            <View key={ingredient.id} style={styles.OptionalIngredients}>
              <Text style={styles.IngredientTitle}>{ingredient.title}</Text>
              <Switch
                style={styles.SwitchMargin}
                trackColor={{false: '#767577', true: '#FF7F50'}}
                thumbColor={
                  optionalIngred[ingredient.id] ? '#FF4D00' : '#f4f3f4'
                }
                onValueChange={() => toggleSwitch(ingredient.id)}
                value={optionalIngred[ingredient.id]}
              />
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => handleAddExcludedIngredients()}>
        <Text style={styles.ButText}>Готово</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    elevation: 10,
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#ffffff',
  },
  Arrow: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  TitleText: {
    alignSelf: 'center',
    marginLeft: '5%',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    color: 'black',
  },
  DishTitle: {
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: '5%',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
  },
  Ingredients: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  OptionalIngredients: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  IngredientTitleMargin: {
    marginBottom: 20,
  },
  IngredientTitle: {
    marginLeft: 80,
    fontSize: 24,
    fontWeight: '300',
    color: '#000000',
  },
  SwitchMargin: {
    marginRight: 30,
  },
  Button: {
    top: '3%',
    right: '10%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
