import './App.css'
import React from 'react'
import Home from './pages/home/home'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { persistStore } from 'redux-persist'
import Checkout from './components/checkout/checkout'
import { PersistGate } from 'redux-persist/lib/integration/react'

const store = configureStore()
const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div>
          <Home />
          <Checkout />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
