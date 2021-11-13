import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation<RootStackParamList>();
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => navigation.navigate('MarketMain')}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}> Изменить состав </Text>
      </View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '13%',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Arrow: {
    width: 30,
    height: 30,
    marginLeft: '20px',
  },
  TitleText: {
    alignSelf: 'center',
    marginLeft: '5%',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
});
