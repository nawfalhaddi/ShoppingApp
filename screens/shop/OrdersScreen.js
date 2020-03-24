import React,{useLayoutEffect} from 'react'; 
import {Text, FlatList,View,Platform} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constant/Colors';
import OrderItem from '../../components/shop/OrderItem';


const OrdersScreen=props=>{

    const {navigation}=props;
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:'Your Orders',
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



    const orders= useSelector(state=>state.orders.orders);
    return(
        <View>
        <FlatList
        data={orders}
        keyExtractor={item=>item.id}
        renderItem={({item})=><OrderItem order={item}/>}  
        />
        </View>
    )
}

export default OrdersScreen;