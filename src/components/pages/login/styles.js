import { THEME } from '../../../theme';

export default {
    container: {
        backgroundColor: THEME.PRIMARY,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleGrid: {
        maxHeight: 65,
        minHeight: 50
    },
    titleIcon: { 
        alignItems: 'flex-end', 
        marginTop: 5, 
        marginRight: 10 
    },
    title: {
        color: THEME.TEXT_LIGHT,
        fontSize: 35
    },
    field: { 
        height: 40,
        marginTop: 15,
        width: 350
    },
    fieldText: { 
        color: THEME.TEXT_LIGHT
    },
    fieldErrorText: { 
        color: THEME.ERROR_TEXT
    },
    fieldInput: { 
        color: THEME.TEXT_LIGHT
    },
    buttonGroupContainer: {
        marginVertical: 15,
        minHeight: 100,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    submitButton: {
        marginTop: 15,
        backgroundColor: THEME.TEXT_LIGHT,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText: {
        color: THEME.PRIMARY
    }
};
