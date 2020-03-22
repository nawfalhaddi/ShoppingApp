import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import ProductNavigator from './navigation/ProductNavigator';


const store = createStore(rootReducer);


export default function App() {
  return (

    <Provider store={store}>
        <ProductNavigator/>
    </Provider>
  );
}


