import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  Wrap: {
    top: '5%',
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
  street: {
    alignSelf: 'center',
    top: '6%',
    width: '90%',

    borderRadius: 4,
    borderColor: '#C6C6C6',
    marginBottom: '2%',
    backgroundColor: '#E2E6EE',
    color: '#666666',
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
  Container: {
    top: '15%',
  },
  Arrow: {
    top: '26%',
    width: 30,
    height: 30,
    marginRight: 15,
    marginLeft: 5,
  },
  simpText: {
    left: '5%',
    top: '5%',
    color: 'black',
  },
  error: {
    left: 15,
    color: 'red',
    top: '4%',
  },
  TitleText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',

    fontSize: 25,
    fontWeight: 'normal',
    color: 'black',
  },
  Button: {
    top: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
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
});
export default styles;
