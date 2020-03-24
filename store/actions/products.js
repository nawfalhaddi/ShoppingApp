import {DELETE_PRODUCT} from '../types';

export const deleteProduct=(productId)=>{
    return {type:DELETE_PRODUCT,pid:productId};
}