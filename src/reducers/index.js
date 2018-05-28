import { reducer as FormReducer } from 'redux-form';
import { reducer as network } from 'react-native-offline';
import UserReducer from './user.reducer';
import CopiedItemsReducer from './copied-item.reducer';

export default {
  form: FormReducer,
  user: UserReducer,
  copiedItems: CopiedItemsReducer,
  network,
};
