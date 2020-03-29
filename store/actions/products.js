import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../types';
import Product from '../../models/product';

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shop-app-d2beb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        });
        dispatch({ type: DELETE_PRODUCT, pid: productId });
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch('https://rn-shop-app-d2beb.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            let loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })

        } catch (error) {
            throw error;
        }
    }
}

export const createProduct = (title, description, imageUrl, price) => {


    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shop-app-d2beb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }),
        })
        const resData = await response.json();

        dispatch(
            {
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId: userId

                }
            }
        );
    }

}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-shop-app-d2beb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, imageUrl }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        return dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: { title, description, imageUrl }
        });
    }

}