import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constant/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card';

const CartScreen = props => {

    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Your Cart',
        })
        return () => { }
    }, [navigation]);





    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        let transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }

        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();
    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button
                    title='Order Now'
                    color={Colors.accent}
                    disabled={cartItems.length === 0 ? true : false}
                    onPress={sendOrderHandler}
                />}

            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={({ item }) => (
                    <CartItem quantity={item.quantity}
                        title={item.productTitle}
                        amount={item.sum}
                        deletable={true}
                        onRemove={() => { dispatch(cartActions.removeFromCart(item.productId)) }} />
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,

    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary,

    }
})
export default CartScreen;