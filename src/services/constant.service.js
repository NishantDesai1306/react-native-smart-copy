export const SERVER_URL = 'http://smartcopy.herokuapp.com';

export const ACTIONS = {
    USER: {
        USER_LOGGED_IN: 'USER_LOGGED_IN',
        USER_LOGGED_OUT: 'USER_LOGGED_OUT',
        USER_UPDATED: 'USER_UPDATED',
    },
    COPIED_ITEMS: {
        ADD_ITEMS: 'ADD_ITEMS',
        ADD_ITEM: 'ADD_ITEM',
        UPDATE_ITEM: 'UPDATE_ITEM',
        DELETE_ITEM: 'DELETE_ITEM',

        SELECT_FOR_EDIT: 'SELECT_FOR_EDIT'
    }
};

export const REDUX_FORM_KEYS = {
    LOGIN: 'loginForm',
    REGISTRATION: 'registrationForm',

    SEARCH_BAR: 'searchBar',

    EDIT_COPIED_ITEM: 'editCopiedItem',
    CREATE_COPIED_ITEM: 'createCopiedItem',

    ACCOUNT_DETAILS: 'accountDetailsForm',
    CHANGE_PASSWORD: 'changePasswordForm'
};
