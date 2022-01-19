import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Conta: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 30,
  },
  Pict: {
    width: 160,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  StyledDish: {
    marginBottom: '5%',
  },
  GreatCont: {
    justifyContent: 'space-around',
  },
  MainCont: {
    top: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  CountCont: {
    alignItems: 'center',
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '24%',
  },
  TextContainer: {
    flexDirection: 'row',
  },
  StyledText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    top: 4,

    paddingRight: 15,
    color: '#000000',
  },
  StyledCount: {
    fontSize: 24,
    lineHeight: 40,
    color: '#000000',
  },
  Wrapper: {
    top: '3%',
    right: '30%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  DelPasEng: {
    position: 'relative',
    top: 100,
    left: 20,
  },
  DellText: {
    textAlign: 'center',
    width: 160,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    color: '#000000',
  },
  AddText: {
    textAlign: 'center',
    width: 190,
    borderRadius: 10,
    borderWidth: 1,
    color: '#000000',
  },
  SimpText: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 15,
  },
  ScrollStyle: {
    height: '60%',
  },
  PictBut1: {
    right: 5,
    width: 25,
    height: 25,
  },
  PictBut2: {
    left: 5,
    width: 25,
    height: 25,
  },
  changeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    color: '#FF4D00',
  },
});

export default styles;
