import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import { Platform } from 'react-native';
import Colors from '../constant/Colors';
import CartScreen from '../screens/shop/CartScreen';



const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerStyle:{
                backgroundColor:Platform.OS==='android'?Colors.primary:''
            },
            headerTitleStyle:{fontFamily:'open-sans-bold'},
            headerTintColor:Platform.OS==='android'?'white':Colors.primary,
            headerBackTitleStyle:{fontFamily:'open-sans'}
        }}>
            <Stack.Screen name="Products" component={ProductsOverviewScreen}/>
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

const ProductNavigator = props => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}

export default ProductNavigator;