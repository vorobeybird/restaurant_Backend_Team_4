import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000000',
  },
  textInput: {
    alignSelf: 'center',
    top: '5%',
    width: windowWidth - windowWidth * 0.2,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C6C6C6',
    marginBottom: '2%',
    bottom: '5%',
    color: 'black',
  },
  textInputError: {
    color: 'red',
    backgroundColor: '#e89494',
  },
  signUpButton: {
    top: '25%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - windowWidth * 0.2,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#FF4D00',
    borderWidth: 1,
    borderRadius: 4,
  },
  forgotPasswordText: {
    fontWeight: '500',
    color: '#FF4D00',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    top: '5%',
  },
  signInButton: {
    top: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - windowWidth * 0.2,
    height: '8%',
    backgroundColor: '#FF4D00',
    borderRadius: 4,
    marginBottom: 10,
  },
  signInButtonDisabled: {
    backgroundColor: '#34343418',
    borderWidth: 0,
  },
  signInButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  signInButtonTextDisabled: {
    color: 'rgb(49,48,49)',
  },
  errorMessage: {
    color: 'red',
    top: '4%',
    width: windowWidth - windowWidth * 0.2,
  },
  additionalButton: {
    top: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  additionalButtonText: {
    color: 'black',
  },
});

export default styles;
