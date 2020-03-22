import React,{useLayoutEffect} from 'react';
import { FlatList ,Text} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'


const ProductsOverviewScreen = props => {

    const {navigation}=props;
    useLayoutEffect(()=>{
        navigation.setOptions({headerTitle:'All Products'})
        return ()=>{}
    },[navigation]);

    const dispatch=useDispatch();

    const products = useSelector(state => state.products.availableProducts);

    return <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} 
        onViewDetail={()=>navigation.navigate('ProductDetail',{productId:item.id})}
        onAddToCart={()=>{ dispatch(cartActions.addToCart(item)) }}/>}
        keyExtractor={item=>item.id}
    />
}

export default ProductsOverviewScreen;