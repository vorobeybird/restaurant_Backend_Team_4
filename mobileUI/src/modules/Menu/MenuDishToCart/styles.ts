import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  byn: {
    fontSize: 13,
  },
  priceText: {
    top: '13%',
    left: '10%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
  },
  list: {
    flexDirection: 'row',
  },
  listPict: {
    marginRight: 10,
    alignSelf: 'center',
  },
  SostItem: {
    color: '#000000',
  },
  Sostav: {
    color: '#000000',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
  },
  Arrow: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  TitleText: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    marginLeft: 5,
  },
  Title: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Header: {
    bottom: '2%',
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  Pict: {
    top: '1%',
    alignSelf: 'center',

    width: 325,
    height: 265,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  BotText: {
    top: '5%',
    left: '10%',
    flexDirection: 'column',
  },
  Descr: {
    textAlign: 'left',
    color: 'black',
  },
  Wrapper: {
    flex: 1,
    paddingBottom: '50%',
    backgroundColor: 'white',
  },
  Cost: {
    textAlign: 'left',
    color: 'black',
  },
  GoBackWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%',
    height: '12%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
  },
  ButtText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
  Text: {
    color: 'black',
  },
  calWrapper: {
    left: '8%',
    top: '10%',
    flexDirection: 'row',
  },
  textCalWraper: {
    color: 'black',
  },
});

export default styles;
