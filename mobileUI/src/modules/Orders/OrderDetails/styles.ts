import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  finHardText: {
    left: 45,
    paddingTop: 15,
    color: '#FF4D00',
  },
  finText: {
    right: 40,
    color: 'black',
    paddingTop: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  butStyle: {
    position: 'absolute',
    top: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  TotalCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contContent: {
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  Qan: {
    color: 'black',
    right: '70%',
  },
  Price: {
    color: 'black',
    right: '70%',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  color: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 18,

    color: '#979A9F',
  },
  flexEnd: {
    justifyContent: 'flex-end',
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
  orderDishes: {
    paddingBottom: 15,
    paddingTop: 15,
    top: '10%',
    elevation: 3,
    alignSelf: 'center',
    width: '96%',
    backgroundColor: '#F3F5F9',
    borderRadius: 10,
  },
  flexWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
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

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  simpText: {
    color: 'black',
  },
  orderType: {
    paddingBottom: 15,
    paddingTop: 15,
    top: '5%',
    elevation: 3,
    alignSelf: 'center',
    width: '96%',
    backgroundColor: '#F3F5F9',
    borderRadius: 10,
  },
});

export default styles;
