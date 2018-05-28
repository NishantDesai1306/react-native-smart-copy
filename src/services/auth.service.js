import Axios from './axios.service';
import * as userActions from '../actions/user.actions';
import { store as Store } from '../store';
import { SERVER_URL } from './constant.service';

const AUTH_URL = `${SERVER_URL}/app/auth`;

const sendRequest = (requestData) => {
    const requestConfig = {
        method: requestData.method,
        url: AUTH_URL + (requestData.resource || ''),
        data: requestData.data
    };

    if (requestData.headers) {
        requestData.headers = requestData.headers;
    }

    return Axios(requestConfig);
};

export const isUserLoggedIn = () => !!Store.getState().user && Store.getState().user.username;

export const login = (userCredentials) => {
    const requestConfig = {
        method: 'post', 
        resource: '/login', 
        data: userCredentials
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;

        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        }

        return res.data;
    });
};

export const logout = () => {
    const requestConfig = {
        method: 'post', 
        resource: '/logout'
    };

    return sendRequest(requestConfig).then((res) => {
        if (res.data.status) {
            Store.dispatch(userActions.userLoggedOut());
        }

        return res.data;
    });
};

export const register = (userDetails) => {
    const requestConfig = {
        method: 'post', 
        resource: '/register', 
        data: userDetails
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;

        console.log('res', resData);

        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        }

        return res.data;
    });
};

export const validateEmail = (email) => {
    const requestConfig = {
        method: 'get', 
        resource: `/validate-email?email=${email}`
    };

    return sendRequest(requestConfig).then((res) => res.data);
};

export const validateUsername = (username) => {
    const requestConfig = {
        method: 'get', 
        resource: `/validate-username?username=${username}`
    };

    return sendRequest(requestConfig).then((res) => res.data);
};
