import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
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
import AuthenticateScreen from '../screens/auth/AuthenticateScreen';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import * as authActions from '../store/actions/auth';



function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                icon={() => {
                    return (
                        <Ionicons color={Platform.OS === 'android' ? 'white' : Colors.primary}
                            size={23} name={'ios-log-out'} />)
                }}
                activeTintColor={Platform.OS === 'android' ? 'white' : Colors.primary}
                inactiveTintColor={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => {
                    dispatch(authActions.logout());
                }}
            />
        </DrawerContentScrollView>
    );
}

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

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenNavOptions}>
            <Stack.Screen name="Admin" component={UserProductsScreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
    )
}

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Authenticate"
            screenOptions={screenNavOptions}>
            <Stack.Screen name="Authenticate" component={AuthenticateScreen} options={{
                animationTypeForReplace: 'pop'
            }} />

        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
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
                    ),
                    animationTypeForReplace: 'pop'
                }} />
            <Drawer.Screen name="Orders" component={OrderStackNavigator}
                options={{
                    drawerLabel: 'Your Orders',
                    drawerIcon: drawerConfig => (
                        <Ionicons color={drawerConfig.color} size={23}
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} />
                    )
                }} />
            <Drawer.Screen name="Admin" component={AdminStackNavigator}
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

export default ProductNavigator = props => {
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();


    useEffect(() => {
        const tryLogin = async () => {
            setIsLoading(true);
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                setIsLoading(false);
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !token || !userId) {
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            dispatch(authActions.authenticate(userId, token));
        };
        tryLogin();
    }, [])


    return (
        <NavigationContainer>
            {isLoading ?
                <View style={styles.screen}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
                : !token && !userId ? <AuthStackNavigator /> : <DrawerNavigator />}
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
