import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  HeadWrap: {
    top: '2%',
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
  errorStreet: {
    top: 20,
    left: 40,
    color: 'red',
  },
  errorHome: {
    top: 50,
    left: 40,
    color: 'red',
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
    top: '12%',
    flexDirection: 'column',
  },
  prgressText: {
    position: 'absolute',
    top: '60%',
    alignSelf: 'center',
    color: '666666',
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
    top: '30%',
    right: '10%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
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
