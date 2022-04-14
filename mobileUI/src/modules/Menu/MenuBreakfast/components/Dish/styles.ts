import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btCont: {
    top: '4%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  Header: {
    fontFamily: 'Roboto',
    lineHeight: 20,
    bottom: '2%',
    fontSize: 18,
    color: 'black',
  },
  Pict: {
    borderRadius: 8,
    width: 324,
    height: 200,
  },
  BotText: {
    top: 20,
    width: 300,
    flexDirection: 'column',
  },
  Descr: {
    textAlign: 'left',
    color: '#939393',
  },
  Wrapper: {
    top: '1%',
    alignItems: 'center',
    paddingBottom: '16%',
  },
  Cost: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
});

export default styles;
