import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useSelector } from 'react-redux'
import Colors from '../../constant/Colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        let transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,
            })
        }

        return transformedCartItems;
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                title='Order Now' 
                color={Colors.accent}
                disabled={cartItems.length===0?true:false} />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item=>item.productId}
                renderItem={({item})=>(
                    <CartItem quantity={item.quantity} title={item.productTitle} amount={item.sum} onRemove={()=>{}}/>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
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