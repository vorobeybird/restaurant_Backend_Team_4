import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  LinkWrapper: {
    alignSelf: 'flex-start',
    justifyContent: 'space-evenly',
    top: '10%',
    paddingLeft: '10%',
  },
  TextStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 25,

    color: '#000000',
  },
  TextStylePol: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000',
  },
  BoxWrapper: {
    marginBottom: '5%',
    flexDirection: 'row',
  },
  PictStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 25,
    marginRight: '5%',
    marginLeft: '5%',
  },
});

export default styles;
