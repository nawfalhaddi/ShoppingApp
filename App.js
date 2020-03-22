import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import ProductNavigator from './navigation/ProductNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
// import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />
  }

  return (

    <Provider store={store}>
      <ProductNavigator />
    </Provider>
  );
}


