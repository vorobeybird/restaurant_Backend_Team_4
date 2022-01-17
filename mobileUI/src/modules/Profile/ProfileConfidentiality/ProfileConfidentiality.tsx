import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

const ProfileConfidentiality = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Политика конфиденциальности</Text>
      </View>
    </View>
  );
};

export default ProfileConfidentiality;
