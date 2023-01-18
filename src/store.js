import thunk from 'redux-thunk'
import { checkout } from './reducers/home'
import { persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducer = { checkout }

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['']
}

const rootReducer = combineReducers(reducer)
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () =>
  createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )