import { ACTIONS } from '../services/constant.service';

const {
    COPIED_ITEMS: {
        ADD_ITEMS,
        ADD_ITEM,
        UPDATE_ITEM,
        DELETE_ITEM,
        SELECT_FOR_EDIT
    }
} = ACTIONS;

export const addItems = (items) => ({
    type: ADD_ITEMS,
    payload: items
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const updateItem = (itemId, newValue) => ({
    type: UPDATE_ITEM,
    payload: {
        itemId,
        value: newValue
    }
});

export const deleteItem = (itemId) => ({
    type: DELETE_ITEM,
    payload: itemId
});

export const selectForEdit = (itemId) => ({
    type: SELECT_FOR_EDIT,
    payload: itemId
});
