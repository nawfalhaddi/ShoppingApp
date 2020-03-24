import React,{useLayoutEffect} from 'react';
import { FlatList,View ,Platform,Button} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {
    const userProducts =useSelector(state => state.products.userProducts);
    const {navigation}=props;
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:'Your Products',
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

    return (
        <View>
            <FlatList
                data={userProducts}
                keyExtractor={item=>item.id}
                renderItem={({item}) => 
                <ProductItem item={item} 
                onSelect={()=>{}}>
                     
                    <Button color={Colors.primary} title="Edit" onPress={() => {}} />
                    <Button color={Colors.primary} title="Delete" onPress={()=>{dispatch(productActions.deleteProduct(item.id))}} />

                </ProductItem>}
            />
        </View>
    )

}


export default UserProductsScreen;