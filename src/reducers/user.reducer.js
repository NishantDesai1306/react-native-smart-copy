import { ACTIONS } from '../services/constant.service';

const {
    USER: {
        USER_LOGGED_IN,
        USER_LOGGED_OUT,
        USER_UPDATED
    }
} = ACTIONS;

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            console.log('logged in', action);
            return Object.assign({}, state, action.payload);
        case USER_UPDATED:
            return Object.assign({}, state, action.payload);
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;
