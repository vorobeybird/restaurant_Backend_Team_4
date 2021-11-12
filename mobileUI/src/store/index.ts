import { configureStore, combineReducers } from '@reduxjs/toolkit'
import dishReducer from './StoreCard'


export const Store = configureStore({
    reducer: 
        combineReducers({
            dishes: dishReducer
        })
    
  })