import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { FlatList, Text, Platform, Button, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState()
    const dispatch = useDispatch();
    const { navigation } = props;
    const products = useSelector(state => state.products.availableProducts);
    const selectHandler = (title, id) => {
        navigation.navigate(title, { productId: id })
    }

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setError, setIsRefreshing]);


    useEffect(() => {
        const FocusSub = navigation.addListener('focus', loadProducts);
        return () => {
            FocusSub.remove();
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts, setIsLoading]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'All Products',
            headerRight: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => navigation.navigate('Cart')}
                />
            ),
            headerLeft: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    size={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => navigation.toggleDrawer()}
                />
            )
        })
        return () => { }
    }, [navigation, loadProducts]);




    if (error) {
        return <View style={styles.centered}>
            <Text>An error has occurred !</Text>
            <Button title='Redload' onPress={loadProducts} />
        </View>
    }


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No Products Found. Start by adding Some</Text>
        </View>
    }

    return <FlatList onRefresh={loadProducts} refreshing={isRefreshing}
        data={products}
        renderItem={({ item }) =>
            <ProductItem item={item} onSelect={() => { selectHandler('ProductDetail', item.id) }}>

                <Button color={Colors.primary} title="View Details" onPress={
                    () => { selectHandler('ProductDetail', item.id) }} />

                <Button color={Colors.primary} title="To Cart" onPress={() => { dispatch(cartActions.addToCart(item)) }} />

            </ProductItem>
        }
        keyExtractor={item => item.id}
    />
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen;
