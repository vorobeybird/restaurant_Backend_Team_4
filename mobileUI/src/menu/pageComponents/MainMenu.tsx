import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'

export const MainMenu = () => {

  return (
    <View>
          <Text style={styles.Title} >Завтраки</Text>
          
    </View>
  );
};

const styles = StyleSheet.create({
  
  Title: {
    
    alignSelf:'center',
    fontFamily: 'Open Sans',
    fontSize: 30,
    fontWeight: 'bold',
    color:'black'
  },
});