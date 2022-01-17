import React from 'react';
import {Text, View} from 'react-native';
import ProfileLinks from './components/ProfileLinks/ProfileLinks';
import styles from './styles';
import UserInfo from './components/UserInfo';

const ProfileMain = () => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.PictCont}>
        <Text style={styles.Header}>Профиль</Text>
      </View>
      <UserInfo />
      <ProfileLinks />
    </View>
  );
};

export default ProfileMain;
