import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contenWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 87,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
  },
  Title: {
    flexDirection: 'row',
    height: '9%',
    width: '100%',

    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  TextStyle: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  leftPict: {
    left: 30,
  },
  rightPict: {
    right: 30,
  },
  simpWrapper: {
    alignItems: 'center',
  },
});

export default styles;
