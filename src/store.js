import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import allReducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    debug: true,
    blacklist: ['form', 'navigation', 'network'],
    stateReconciler: hardSet
};

const persistedReducer = persistCombineReducers(persistConfig, allReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
