import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Bin: {
    right: '30%',
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  mainCont: {
    flex: 1,
    backgroundColor: 'white',
  },
  PictCont: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#F4F4F4',
  },
  Header: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 33,
    color: '#000000',
  },
  FoodContainer: {
    top: '20%',
    left: '10%',
  },
  TypeWrapper: {
    top: '5%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TypeContainer: {
    flexDirection: 'row',
  },
  FinalCheckCont: {
    width: 341,
    height: 60.43,
    top: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: 'white',
  },
  ButWrapp: {
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    height: '70%',
    borderRadius: 4,
    backgroundColor: '#FF4D00',
  },
  But: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
  TextType: {
    width: 80,
    color: '#000000',
  },
  SimpText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 15,
    color: '#000000',
  },
  emptyCard: {
    alignSelf: 'center',
  },
  emptyCardWrapper: {
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCardText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23,
    color: '#000000',
  },
  emptyText: {
    color: '#606060',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 15,
  },
  ButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%',
    height: '17%',
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
});

export default styles;
