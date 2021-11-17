import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import dishReducer from './StoreCard'
import { persistReducer } from 'redux-persist'


import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    dishes: dishReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  })