import { THEME } from '../../../../../theme';

export default {
    container: {
        backgroundColor: THEME.TEXT_LIGHT,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleGrid: {
        maxHeight: 65
    },
    titleIcon: { 
        alignItems: 'flex-end', 
        marginTop: 5, 
        marginRight: 10 
    },
    title: {
        color: THEME.PRIMARY,
        fontSize: 35
    },
    field: { 
        height: 40,
        borderColor: THEME.PRIMARY,
        marginTop: 15,
        width: 350
    },
    fieldText: { 
        color: THEME.PRIMARY
    },
    fieldErrorText: { 
        color: THEME.ERROR_TEXT
    },
    fieldInput: { 
        color: THEME.PRIMARY,
        borderBottomColor: THEME.PRIMARY
    },
    buttonGroupContainer: {
        marginTop: 15,
        height: 100,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    submitButton: {
        marginTop: 15,
        backgroundColor: THEME.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText: {
        color: THEME.TEXT_LIGHT
    }
};
