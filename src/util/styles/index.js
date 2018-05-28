import { Dimensions } from 'react-native';
import VARIABLES from 'native-base/src/theme/variables/platform';
import { THEME } from '../../theme';

export const FLEX_1 = {
    flex: 1
};

export const FLEX_2 = {
    flex: 2
};

export const FLEX_3 = {
    flex: 3
};

export const FLEX_4 = {
    flex: 4
};

export const FLEX_5 = {
    flex: 5
};

export const ML_10 = {
    marginLeft: 10
};

export const ML_20 = {
    marginLeft: 20
};

export const MT_20 = {
    marginTop: 20
};

export const MT_10 = {
    marginTop: 10
};

export const MT_5 = {
    marginTop: 5
};

export const EMPTY = {};

export const DISABLED = {
    backgroundColor: 'red',
    color: THEME.TEXT_DARK
};

export const DISABLED_TEXT = {
    color: THEME.DISABLED_TEXT
};

export const HORIZONTALLY_LEFT = Object.assign({}, FLEX_1, {
    alignItems: 'flex-start'
});

export const HORIZONTALLY_CENTER = Object.assign({}, FLEX_1, {
    alignItems: 'center'
});

export const HORIZONTALLY_RIGHT = Object.assign({}, FLEX_1, {
    alignItems: 'flex-end'
});

export const VERTICALLY_CENTER = Object.assign({}, FLEX_1, {
    justifyContent: 'center'
});

export const SCREEN = Dimensions.get('window');

export const CENTER = Object.assign({}, HORIZONTALLY_CENTER, VERTICALLY_CENTER);

export const NATIVE_BASE_VARIABLES = VARIABLES;
