import { THEME } from '../../../theme';
import { CENTER } from '../../../util/styles';

export const mainContainer = Object.assign({}, CENTER, { 
    backgroundColor: THEME.PRIMARY, 
    padding: 25 
});

export const icon = {
    color: THEME.TEXT_LIGHT,
    fontSize: 40
};

export const text = {
    color: THEME.TEXT_LIGHT,
    fontSize: 20,
    fontWeight: '400'
};

export const refreshButton = {
    marginTop: 20,
    backgroundColor: THEME.TEXT_LIGHT
};

export const refreshButtonText = {
    color: THEME.PRIMARY,
    fontSize: 20
};

