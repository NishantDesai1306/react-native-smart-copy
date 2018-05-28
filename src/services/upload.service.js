import Axios from './axios.service';
import { store as Store } from '../store';
import { SERVER_URL } from './constant.service';
import RNFetchBlob from 'react-native-fetch-blob';

const RESOURCE_URL = `${SERVER_URL}/app/api/upload`;

const sendRequest = (requestData) => {
    const requestConfig = {
        method: requestData.method,
        url: RESOURCE_URL + (requestData.resource || ''),
        data: requestData.data
    };

    if (requestData.headers) {
        requestData.headers = requestData.headers;
    }

    return Axios(requestConfig);
};

export const uploadFile = (fileData) => {
    const accessToken = Store.getState().user && Store.getState().user.token;

    if (!accessToken) {
        return new Promise.reject('Access token not found');
    }

    return RNFetchBlob.fetch('POST', RESOURCE_URL, {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': accessToken
    }, [
        { name: 'file', filename: 'profilePicture.png', data: fileData }
    ])
    .then((res) => {
        if (res.respInfo.status === 200) {
            return JSON.parse(res.data);
        }

        throw new Error(res);
    });
};
