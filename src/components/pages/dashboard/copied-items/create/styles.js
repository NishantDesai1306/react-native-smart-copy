import { StatusBar } from 'react-native';
import { NATIVE_BASE_VARIABLES } from '../../../../../util/styles';
import { THEME } from '../../../../../theme';

export const field = { 
    marginTop: 15,
    flex: 1,
    paddingHorizontal: 10
};
export const fieldContainer = {
    flex: 1
};
export const fieldText = { 
    color: THEME.PRIMARY
};
export const fieldErrorText = { 
    color: THEME.ERROR_TEXT
};
export const fieldInput = { 
    flex: 1,
    height: NATIVE_BASE_VARIABLES.deviceHeight - (StatusBar.currentHeight + NATIVE_BASE_VARIABLES.toolbarHeight)
};
export const container = {
    backgroundColor: THEME.TEXT_LIGHT
};
