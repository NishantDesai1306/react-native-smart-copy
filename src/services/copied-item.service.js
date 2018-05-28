import Axios from './axios.service';
import * as copiedItemActions from '../actions/copied-item.actions';
import { store as Store } from '../store';
import { SERVER_URL } from './constant.service';

const API_URL = `${SERVER_URL}/app/api/copied-items`;

const sendRequest = (requestData) => {
    const requestConfig = {
        method: requestData.method,
        url: API_URL + (requestData.resource || ''),
        data: requestData.data
    };

    if (requestData.headers) {
        requestData.headers = requestData.headers;
    }

    return Axios(requestConfig);
};

export const getCopiedItems = () => {
    const requestConfig = {
        method: 'get', 
        resource: '/'
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;
        
        if (resData.status) {
            Store.dispatch(copiedItemActions.addItems(resData.data));
        } else {
            throw new Error(resData.reason);
        }

        return res.data;
    });
};

export const updateItem = (newValue) => {
    const {
        copiedItems: {
            selectedForEdit: itemId
        }
    } = Store.getState();
    const requestConfig = {
        method: 'post', 
        resource: '/update',
        data: { 
            _id: itemId, 
            value: newValue 
        }
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;
        
        if (resData.status) {
            Store.dispatch(copiedItemActions.addItem(itemId, resData.data));
        } else {
            throw new Error(resData.reason);
        }

        return res.data;
    });
};

export const createItem = (newValue) => {
    const requestConfig = {
        method: 'post', 
        resource: '/insert',
        data: { 
            value: newValue 
        }
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;
        
        if (resData.status) {
            Store.dispatch(copiedItemActions.addItem(resData.data));
        } else {
            throw new Error(resData.reason);
        }

        return res.data;
    });
};

export const deleteItem = (itemId) => {
    const requestConfig = {
        method: 'post', 
        resource: '/delete',
        data: { _id: itemId }
    };

    return sendRequest(requestConfig).then((res) => {
        const resData = res.data;
        
        if (resData.status) {
            Store.dispatch(copiedItemActions.deleteItem(itemId));
        } else {
            throw new Error(resData.reason);
        }

        return res.data;
    });
};
