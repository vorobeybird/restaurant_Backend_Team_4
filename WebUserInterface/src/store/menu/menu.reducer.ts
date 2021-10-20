import { ReducerState, MenuActions, MenuConstants } from './menu.types';

const menuItems: ReducerState = {
  items: [
    {
      title: 'Борщ',
      price: 20,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [1, 3],
      calories: 200,
      photo:
        'https://fasol.tv/upload/iblock/71d/71db4fee4773a9754602b0165189159e.png',
    },
    {
      title: 'Борщ',
      price: 11,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [2, 4],
      calories: 150,
      photo:
        'https://fasol.tv/upload/iblock/71d/71db4fee4773a9754602b0165189159e.png',
    },
    {
      title: 'Борщ',
      price: 11,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [1],
      calories: 150,
      photo:
        'https://tekhnolog.com/wp-content/uploads/2021/03/borshh-ukrainskij-s-salom-i-pampushkami-pod-chesnochnym-sousom.jpg',
    },{
      title: 'Борщ',
      price: 11,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [3],
      calories: 150,
      photo:
        'https://fasol.tv/upload/iblock/71d/71db4fee4773a9754602b0165189159e.png',
    },{
      title: 'Борщ',
      price: 11,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [2],
      calories: 150,
      photo:
        'https://fasol.tv/upload/iblock/71d/71db4fee4773a9754602b0165189159e.png',
    },{
      title: 'Борщ',
      price: 11,
      default_ingredients: 'there are some unchangeble ingredients',
      ingredients: [1, 2],
      weight: 200,
      categories: [1, 3, 4],
      calories: 150,
      photo:
        'https://fasol.tv/upload/iblock/71d/71db4fee4773a9754602b0165189159e.png',
    },
  ],
};

export function menuReducer(
  state: ReducerState = menuItems,
  action: MenuActions
): ReducerState {
  switch (action.type) {
    case MenuConstants.FETCH_ITEMS:
      return { items: action.payload.items };
    default:
      return state;
  }
}