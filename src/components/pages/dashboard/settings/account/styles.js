import { THEME } from '../../../../../theme';

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.TEXT_LIGHT
    },
    field: { 
        height: 40,
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
        color: THEME.PRIMARY
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
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderColor: THEME.PRIMARY,
        borderWidth: 5,
        borderRadius: 75
    }
};
