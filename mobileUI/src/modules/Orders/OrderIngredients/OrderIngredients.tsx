import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/ScreenNames';
import {useAppDispatch} from '../../../hooks/hooks';
import styles from './styles';
import {cartActions} from '../../Cart/store/cartStore';

type RootStackParamList = {
  OrderIngredients: undefined;
  navigate: any;
};

const OrderIngredients = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {item} = route.params;
  const dispatch = useAppDispatch();

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
    dispatch(cartActions.addExcludedIngredients(findExcludedIngredients()));
    navigation.navigate(ScreenNames.CartMain);
  };

  const navigation = useNavigation<RootStackParamList>();
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
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

export default OrderIngredients;
