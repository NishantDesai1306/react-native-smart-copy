import { ACTIONS } from '../services/constant.service';

const {
    USER: {
        USER_LOGGED_IN,
        USER_LOGGED_OUT,
        USER_UPDATED
    }
} = ACTIONS;

export const userLoggedIn = (userData) => ({
    type: USER_LOGGED_IN,
    payload: userData
});

export const updateDetails = (userData) => ({
    type: USER_UPDATED,
    payload: userData
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});
