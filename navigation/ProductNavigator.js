import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import { Platform } from 'react-native';
import Colors from '../constant/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';

const screenNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: { fontFamily: 'open-sans-bold' },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerBackTitleStyle: { fontFamily: 'open-sans' },

}

const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenNavOptions}>
            <Stack.Screen name="Products" component={ProductsOverviewScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

const OrdersStack = createStackNavigator();

const OrderStackNavigator = () => {
    return (
        <OrdersStack.Navigator
            screenOptions={screenNavOptions}>
            <OrdersStack.Screen name="Orders" component={OrdersScreen} />
        </OrdersStack.Navigator>
    )
}
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContentOptions={{
            backgroundColor:Platform.OS==='android'?Colors.primary:'',
            activeTintColor:Platform.OS==='android'?'white':Colors.primary,
            itemStyle: { color: Colors.primary }
        }} >
            <Drawer.Screen name="Products" component={StackNavigator}
                options={{
                    drawerLabel: 'All Products',
                    drawerIcon: drawerConfig => (
                        <Ionicons color={drawerConfig.color} size={23}
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} />
                    )
                }} />
            <Drawer.Screen name="Orders" component={OrderStackNavigator}
                options={{
                    drawerLabel: 'Your Orders',
                    drawerIcon: drawerConfig => (
                        <Ionicons color={drawerConfig.color} size={23}
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} />
                    )
                }} />
        </Drawer.Navigator>
    )
}

const ProductNavigator = props => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    )
}

export default ProductNavigator;