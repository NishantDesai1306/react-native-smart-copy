import axios from 'react-native-axios';
import promise from 'promise';
import { store as Store } from '../store';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const accessToken = Store.getState().user && Store.getState().user.token;

    //if token is found add it to the header
    if (accessToken) {
        config.headers['x-auth-token'] = accessToken;
    }

    return config;
}, (error) => promise.reject(error));

export default axiosInstance;
