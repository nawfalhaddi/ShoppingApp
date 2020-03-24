import React, { useLayoutEffect } from 'react';
import { FlatList, Text, Platform,Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';


const ProductsOverviewScreen = props => {

    const { navigation } = props;
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
    }, [navigation]);

    const dispatch = useDispatch();
    const selectHandler=(title,id)=>{
        navigation.navigate(title, { productId: id})
    }

    const products = useSelector(state => state.products.availableProducts);

    return <FlatList
        data={products}
        renderItem={({ item }) => 
        <ProductItem item={item} onSelect={()=>{selectHandler('ProductDetail',item.id)}}>

            <Button color={Colors.primary} title="View Details" onPress={
                () => {selectHandler('ProductDetail',item.id)}} />

            <Button color={Colors.primary} title="To Cart" onPress={()=>{dispatch(cartActions.addToCart(item))}} />

        </ProductItem>
        }
        keyExtractor={item => item.id}
    />
}

export default ProductsOverviewScreen;