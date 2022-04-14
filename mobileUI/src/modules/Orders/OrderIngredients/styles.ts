import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '13%',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#F4F4F4',
  },
  Arrow: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  TitleText: {
    alignSelf: 'center',
    marginLeft: '5%',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
  DishTitle: {
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: '5%',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
  },
  Ingredients: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  OptionalIngredients: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  IngredientTitleMargin: {
    marginBottom: 20,
  },
  IngredientTitle: {
    marginLeft: 80,
    fontSize: 24,
    fontWeight: '300',
    color: '#000000',
  },
  SwitchMargin: {
    marginRight: 30,
  },
  Button: {
    top: '3%',
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
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default styles;
