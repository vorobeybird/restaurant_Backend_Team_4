import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  Header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33,
    color: '#000000',
  },
  HedWrap: {
    height: '15%',
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SearchInput: {
    position: 'relative',
    zIndex: 9,
    width: 200,
  },
  CategoriesList: {
    position: 'absolute',
    top: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    zIndex: 9,
    backgroundColor: '#FFEFD5',
  },
  CategoryFromList: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    color: '#000000',
    marginBottom: 3,
    marginTop: 3,
    zIndex: 9,
  },
  FoodProfileLinks: {
    paddingBottom: 10,
    top: 10,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33,
    color: '#000000',
  },
  Pict: {
    width: 24,
    height: 24,
  },
  FoodContainer: {
    flexGrow: 1,
    top: '2%',
    left: '10%',
    zIndex: -1,
  },
});

export default styles;
