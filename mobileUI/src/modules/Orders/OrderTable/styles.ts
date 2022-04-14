import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  dateImage: {
    right: 15,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  option: {
    alignItems: 'center',
  },
  modalText: {
    margin: 20,
    fontWeight: '700',
    color: 'black',
  },
  container: {
    top: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prgressText: {
    position: 'absolute',
    top: '60%',
    alignSelf: 'center',
    color: '#666666',
  },
  dateText: {
    left: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  box: {
    top: '5%',
    width: '90%',
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginTop: '5%',
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
    fontSize: 25,
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

  Button: {
    top: '20%',
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
