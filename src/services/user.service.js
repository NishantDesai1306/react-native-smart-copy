import Axios from './axios.service';
import * as userActions from '../actions/user.actions';
import { store as Store } from '../store';
import { SERVER_URL } from './constant.service';
import * as UploadService from './upload.service';

const AUTH_URL = `${SERVER_URL}/app/api/user`;

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

export const getUserDetails = (logoutOnFail) => {
    const requestConfig = {
        method: 'get', 
        resource: '/details'
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;
        const user = Store.getState().user;

        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        } else if (user && logoutOnFail) {
            Store.dispatch(userActions.userLoggedOut());
        }

        return res.data;
    });
};

export const updateProfilePicture = (fileData) => {

    return UploadService.uploadFile(fileData)
    .then((res) => {
        return new Promise((resolve, reject) => {
            console.log('uplaod response', res);
            if (res.data) {
                return resolve(res.data);
            }
    
            return reject(res.reason);
        });
    })
    .then((uploadId) => {
        const requestConfig = {
            method: 'post', 
            resource: '/change-profile-picture',
            data: {
                profilePicture: uploadId
            }
        };
    
        return sendRequest(requestConfig).then((res) => {
            const resData = res.data;
    
            if (resData.status) {
                Store.dispatch(userActions.updateDetails(resData.data));
            }
    
            return res.data;
        });
    });
};

export const updateUserDetails = (userDetails) => {
    const requestConfig = {
        method: 'post', 
        resource: '/change-details',
        data: userDetails
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;

        if (resData.status) {
            Store.dispatch(userActions.updateDetails(resData.data));
        }

        return res.data;
    });
};

export const updatePassword = (passwordDetails) => {
    const requestConfig = {
        method: 'post', 
        resource: '/change-password',
        data: passwordDetails
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;

        if (resData.status) {
            Store.dispatch(userActions.updateDetails(resData.data));
        } else {
            throw new Error(resData.reason);
        }
    });
};
