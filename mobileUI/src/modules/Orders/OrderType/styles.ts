import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imgLeft: {
    left: 20,
  },
  prgressText: {
    position: 'absolute',
    top: '60%',
    alignSelf: 'center',
    color: '#66666',
  },
  Wrapper: {
    flex: 1,

    paddingBottom: '14%',
    backgroundColor: 'white',
  },
  Arrow: {
    top: '26%',
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '13%',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Header: {
    position: 'absolute',
    top: '15%',
    alignSelf: 'center',

    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  OrderWrapper: {
    top: '15%',

    flexDirection: 'column',
  },
  ContentWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  OrderText: {
    top: 12,
    lineHeight: 24,
    color: 'black',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  Button: {
    top: '40%',
    right: '10%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default styles;
