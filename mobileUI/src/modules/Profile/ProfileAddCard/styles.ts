import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  HeadWrap: {
    top: '7%',
  },
  CardPict: {
    position: 'absolute',
    top: '25%',
    left: '85%',
    zIndex: 1,
  },
  number: {
    marginLeft: '5%',
    width: '90%',
    backgroundColor: '#E2E6EE',
    borderRadius: 10,
  },
  textNumber: {
    marginLeft: '5%',
    color: 'black',
  },
  live: {
    width: 130,
    borderRadius: 10,
    backgroundColor: '#E2E6EE',
  },
  errorCvv: {
    top: 5,
    right: 10,
    color: 'red',
  },
  errorStreet: {
    top: 5,

    color: 'red',
  },
  errorNum: {
    top: 5,
    left: 15,
    color: 'red',
  },
  textLive: {
    color: 'black',
  },
  Cvv: {
    width: 130,
    right: 15,
    borderRadius: 10,
    backgroundColor: '#E2E6EE',
  },
  textLiveCvv: {
    right: 15,
    color: 'black',
  },
  Name: {
    marginLeft: '5%',
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#E2E6EE',
  },
  textName: {
    marginTop: 10,
    marginLeft: '5%',
    color: 'black',
  },
  col: {
    marginLeft: '5%',
    borderRadius: 10,
    flexDirection: 'column',
  },
  Header: {
    alignSelf: 'center',

    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  inpCont: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  mainWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 300,
    top: '10%',
    flexDirection: 'column',
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  street: {
    alignSelf: 'center',
    top: '10%',
    width: '80%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  home: {
    top: '10%',
    width: '20%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
  },
  Button: {
    position: 'absolute',
    top: '85%',
    width: '90%',

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    height: 50,

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
