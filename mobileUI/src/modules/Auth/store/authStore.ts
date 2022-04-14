import {createSlice} from '@reduxjs/toolkit';

export interface ICardError {
  sixTeen: string;
  Cvv: string;
  Date: string;
}

export interface ICard {
  num: string;
  live: string;
  cvv: string;
  name: string;
  id: number;
  type: string;
}

export interface IAddressDetails {
  str: string;
  house: string;
  corp: string;
  kv: string;
  id: number;
}

interface AddressI {
  address: string;
  id: string;
}

interface AuthStateI {
  email: string;
  password: string;
  isSignedIn: string;
  address: AddressI[];
  card: ICard[];
  userInfo: [];
}

export const initialAuthState: AuthStateI = {
  email: '',
  password: '',
  isSignedIn: '',
  address: [],
  card: [],
  userInfo: [],
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialAuthState,
  reducers: {
    updateAuthStatus(state, action) {
      state.isSignedIn = action.payload;
      console.log(state.isSignedIn);
    },
    addAddress(state, action) {
      const tempProd = {...action.payload};
      let index = Math.floor(Math.random() * 10000000);
      console.log(index);
      tempProd.id = state.address.length + index;
      state.address.push(tempProd);
    },
    delAddress(state, action) {
      const nextItems = state.address.filter(
        address => address.id !== action.payload.id,
      );
      state.address = nextItems;
    },
    addEmail(state, action) {
      state.email = action.payload;
      console.log(state.email);
    },
    addUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    addPassword(state, action) {
      state.password = action.payload;
      console.log(state.password);
    },
    addCard(state, action) {
      const tempProd = {...action.payload};
      let index = Math.floor(Math.random() * 10000000);

      tempProd.id = state.card.length + index;
      const re = new RegExp('^4');
      if (tempProd.num.match(re) != null) {
        tempProd.type = 'visa';
      } else {
        tempProd.type = 'master';
      }
      state.card.push(tempProd);
    },
    delCard(state, action) {
      const nextItems = state.card.filter(
        card => card.id !== action.payload.id,
      );
      state.card = nextItems;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
