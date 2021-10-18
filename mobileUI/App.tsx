import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'
import {ProfileComponent} from './src/profileComponents/ProfileComponent'
import { Menu } from './src/menu/Menu';
import { MarketMain } from './src/marketComponents/MarketMain';
import {BottomTabNavigation} from './src/navigation/nav'
import { Breakfast } from './src/menu/pageComponents/Breakfast';


export const App = () => {
  return (
    <View style={styles.Wrapper}>
      <BottomTabNavigation/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width:'100%',
    height:'100%',
  },

});

export default App;
