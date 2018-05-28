import { THEME } from '../../../../theme';

export const welcomeText = { 
    fontSize: 18,
    color: THEME.PRIMARY,
    fontWeight: '500'
};

export const listItemHeight = 65;

export const container = {
    backgroundColor: THEME.TEXT_LIGHT
};

export const listItem = {
    height: listItemHeight
};

export const avatarContainer = {
    backgroundColor: THEME.PRIMARY, 
    height: 40, 
    borderRadius: 20, 
    width: 40
};

export const avatarText = {
    color: THEME.TEXT_LIGHT, 
    fontWeight: '800'
};

export const listItemText = {
    flex: 7, 
    height: listItemHeight, 
    justifyContent: 'center'
};

export const listItemOptions = {
    flex: 1, 
    height: listItemHeight
};

export const listItemOptionsTrigger = {
    paddingVertical: 10, 
    paddingHorizontal: 15
};

export const menuOptions = {
    padding: 15,
    flexDirection: 'row'
};
