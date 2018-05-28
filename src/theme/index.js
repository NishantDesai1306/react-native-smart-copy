import { Dimensions } from 'react-native';
import { blue, lightBlue, grey, red } from 'material-colors/dist/colors';

export const THEME = {
    PRIMARY: blue['800'],
    SECONDARY: blue['400'],
    TEXT_LIGHT: lightBlue['50'],
    TEXT_DARK: grey['900'],
    ERROR_TEXT: red['700'],
    DISABLED_TEXT: grey['500'],
};

export const SCREEN_HEIGHT = Dimensions.get('window').height;
