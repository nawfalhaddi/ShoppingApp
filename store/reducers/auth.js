import { LOGIN, SIGNUP, LOGOUT } from '../types'
const initialState = {
    token: null,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                token: null, userId: null
            }
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
}

export default authReducer;