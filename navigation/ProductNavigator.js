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
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

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

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenNavOptions}>
            <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
    )
}

const AdminNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenNavOptions}>
            <Stack.Screen name="Admin" component={UserProductsScreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContentOptions={{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
            activeTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
            inactiveTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
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
            <Drawer.Screen name="Admin" component={AdminNavigator}
                options={{
                    drawerLabel: 'Admin',
                    drawerIcon: drawerConfig => (
                        <Ionicons color={drawerConfig.color} size={23}
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
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