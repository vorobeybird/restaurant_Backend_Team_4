import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainCont: {
    top: '5%',
    borderRadius: 20,
    width: '90%',
    elevation: 5,
    height: 200,

    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Conts: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginStart: 10,
  },
  Header: {
    top: 20,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 24,
    color: '#000000',
  },
  Email: {
    top: 20,
    fontFamily: 'Roboto',

    fontSize: 18,

    color: '#000000',
  },
  Phone: {
    top: 20,
    fontFamily: 'Roboto',
    fontStyle: 'normal',

    fontSize: 18,

    color: '#000000',
  },
  ButCont: {
    marginTop: 50,
    width: 146,
    height: 38,
    backgroundColor: '#FF4D00',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',

    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default styles;
