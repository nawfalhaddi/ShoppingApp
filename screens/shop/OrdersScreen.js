import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { Text, FlatList, View, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders'


const OrdersScreen = props => {

    const { navigation } = props;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Your Orders',
            headerLeft: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    size={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => navigation.toggleDrawer()}
                />
            )
        })
        return () => { }
    }, [navigation]);


    const dispatchFetchOrders = useCallback(
        async () => {
            setIsLoading(true);
            await dispatch(ordersActions.fetchOrder());
            setIsLoading(false);

        }
    )

    useEffect(() => {
        const FocusSub = navigation.addListener('focus', dispatchFetchOrders);
        return () => {
            FocusSub.remove();
        }
    }, [dispatch, setIsLoading])


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (orders.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
            <Text style={{ textAlign: 'center' }}>No Orders found , Please start adding new items to your cart and order them!</Text>
        </View>
    }


    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <OrderItem order={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;