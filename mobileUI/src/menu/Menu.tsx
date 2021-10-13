import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'


export const Menu = () => {

  return (
   <View>
       <Text style={styles.Header}>Меню</Text>
       <View style={styles.FoodContainer}>
           <Text style={styles.FoodLinks}>Breakfast</Text>
           <Text style={styles.FoodLinks}>Lunch</Text>
           <Text style={styles.FoodLinks}>Snacks</Text>
           <Text style={styles.FoodLinks}>Soup</Text>
           <Text style={styles.FoodLinks}>Pasta</Text>
           <Text style={styles.FoodLinks}>Salads</Text>
           <Text style={styles.FoodLinks}>Pizza</Text>
           <Text style={styles.FoodLinks}>Sushi</Text>
           <Text style={styles.FoodLinks}>Deserts</Text>
       </View>
   </View>
  );
};

const styles = StyleSheet.create({
    Header:{
        top:'10%',
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        textAlign: 'center',
        color: '#000000',

    },
    FoodLinks:{
        paddingBottom:10,
        top:10,
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        color: '#000000',

    },
    FoodContainer:{
        top:'20%',
        left:'10%',
    }
});


