import {combineReducers} from 'redux';
import productReducer from './products';
import cartReducer from './cart';
import orderReducer from './orders';

const rootReducer=combineReducers({
    products:productReducer,
    cart:cartReducer,
    orders:orderReducer
})

export default rootReducer;