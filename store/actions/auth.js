import { SIGNUP, LOGIN } from '../types';
import { AsyncStorage } from 'react-native';

export const authenticate = (userId, token) => {
    return (dispatch) => {
        dispatch({ type: LOGIN, token: token, userId: userId });
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6pMurOATdKgW5TTn-2rBnKeelPKFgPgg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errData = await response.json();
            let message = 'Something went wrong';

            if (errData.error.message === 'EMAIL_EXISTS') {
                message = 'Sorry ! This email already exists'
            } else if (errData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'Too many attempts! try later '

            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6pMurOATdKgW5TTn-2rBnKeelPKFgPgg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errData = await response.json();
            let message = 'Something went wrong';

            if (errData.error.message === 'EMAIL_NOT_FOUND') {
                message = 'Sorry ! Email is not found'
            } else if (errData.error.message === 'INVALID_PASSWORD') {
                message = 'Your Password is incorrect'

            } else if (errData.error.message === 'USER_DISABLED') {
                message = 'Your account has been disabled'
            }
            throw new Error(message);
        }
        const resData = await response.json();

        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}


const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString(),
    }))
}