import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Scope: {
    left: '250%',
    top: '4.5%',
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  Arrow: {
    top: '26%',
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '10%',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
  Scroll: {
    paddingBottom: '30%',
    backgroundColor: 'white',
  },
  Flat: {
    top: '2%',
  },
});

export default styles;
