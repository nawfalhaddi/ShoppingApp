import {combineReducers} from 'redux';
import productReducer from './products';

const rootReducer=combineReducers({
    products:productReducer,
})

export default rootReducer;