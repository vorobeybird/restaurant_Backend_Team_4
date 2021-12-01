import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Profile from './Profile';
import {Links} from './Links';
import {useSelector} from 'react-redux';
export const ProfileComponent = () => {
  const cart = useSelector(state => state.dishes);
  console.log(cart.userInfo, 'asdf');
  return (
    <View style={styles.Wrapper}>
      <View style={styles.PictCont}>
        <Text style={styles.Header}>Профиль</Text>
      </View>
      <Profile />
      <Links />
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
  },
  PictCont: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ffffff',
  },
  Header: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 33,
    color: '#000000',
  },
});
