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

const DEFAULT_STATE = {
    items: [],
    selectedForEdit: null
};

const copiedItemReducer = (state = DEFAULT_STATE, action) => {
    const newState = Object.assign({}, state);
    
    switch (action.type) {
        case ADD_ITEMS:
            newState.items = action.payload;
            break;
        case ADD_ITEM:
            newState.items.push(action.payload);
            break;
        case SELECT_FOR_EDIT:
            newState.selectedForEdit = action.payload;
            break;       
        case UPDATE_ITEM:
            const { payload: { itemId, value } } = action;
            const index = newState.items.findIndex(({ _id }) => {
                return _id === itemId;
            });

            if (index > -1) {
                newState.items.splice(index, 1, value);
            }

            break;
        case DELETE_ITEM:
            newState.items = state.items.filter(({ _id }) => _id !== action.payload);
            break;
    }

    return newState;
};

export default copiedItemReducer;
