import React, { useLayoutEffect } from 'react';
import { FlatList, View, Platform, Button, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Your Products',
            headerLeft: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    size={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => navigation.toggleDrawer()}
                />
            ),
            headerRight: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
                    size={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => { navigation.navigate('EditProduct') }}
                />
            )
        })
        return () => { }
    }, [navigation]);

    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', { productId: id });
    }
    const deleteHandler = (id) => {
        Alert.alert('Are You Sure', 'Do you really want to delete the product', [
            { text: 'No', style: 'default' }, { text: 'yes', style: 'destructive', onPress: () => { dispatch(productActions.deleteProduct(id)) } }
        ])
    }

    if (userProducts.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
            <Text style={{ textAlign: 'center' }}>No Products found , Please start adding new products!</Text>
        </View>
    }

    return (
        <View>
            <FlatList
                data={userProducts}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <ProductItem item={item}
                        onSelect={() => { editProductHandler(item.id) }}>

                        <Button color={Colors.primary} title="Edit" onPress={() => { editProductHandler(item.id) }} />
                        <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(item.id)} />

                    </ProductItem>}
            />
        </View>
    )

}


export default UserProductsScreen;