import React,{useLayoutEffect} from 'react';
import { FlatList ,Text, Platform} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';


const ProductsOverviewScreen = props => {

    const {navigation}=props;
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:'All Products',
            headerRight:()=>(
                <CustomHeaderButton iconName={Platform.OS==='android'?'md-cart':'ios-cart'} 
                size={23} 
                color={Platform.OS==='android'?'white':Colors.primary}
                onPressing={()=>navigation.navigate('Cart')}
                />
            ),
            headerLeft:()=>(
                <CustomHeaderButton iconName={Platform.OS==='android'?'md-menu':'ios-menu'} 
                size={23} 
                color={Platform.OS==='android'?'white':Colors.primary}
                onPressing={()=>navigation.toggleDrawer()}
                />
            )
        })
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