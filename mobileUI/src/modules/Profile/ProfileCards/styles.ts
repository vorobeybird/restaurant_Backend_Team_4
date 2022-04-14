import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  EmptyTextWrapper: {
    justifyContent: 'center',
    top: '30%',
  },
  EmptyText: {
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
  },
  FullWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '5%',
    top: '5%',
    borderRadius: 10,
    width: '90%',
    elevation: 10,
    height: 100,
    backgroundColor: 'white',
  },
  Text: {
    top: 20,
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  fullContainer: {
    top: '5%',
  },
  simpText: {
    color: 'black',
  },
  typeImg: {
    top: '10%',
    left: 10,
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
  Pict: {
    top: 35,
    marginRight: 30,
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
  Button: {
    position: 'absolute',
    top: '80%',
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
