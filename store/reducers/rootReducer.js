import { combineReducers } from 'redux';
import productReducer from './products';
import cartReducer from './cart';
import orderReducer from './orders';
import authReducer from './auth';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,

})

export default rootReducer;