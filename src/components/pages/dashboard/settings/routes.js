import { StackNavigator } from 'react-navigation';

import SettingsHomeComponent from './index';
import AccountDetailsComponent from './account';
import ChangePasswordComponent from './change-password';

export default StackNavigator({
    SettingsHome: {
        screen: SettingsHomeComponent
    },
    AccountDetails: {
        screen: AccountDetailsComponent,
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed'
        })
    },
    ChangePassword: {
        screen: ChangePasswordComponent,
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed'
        })
    }
}, {
    headerMode: 'none',
    initialRouteName: 'SettingsHome',
});
