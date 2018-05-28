import { StackNavigator } from 'react-navigation';

import CopiedItemsComponent from './index';
import EditCopiedItemComponent from './edit';
import CreateCopiedItemComponent from './create';

export default StackNavigator({
    Home: {
        screen: CopiedItemsComponent
    },
    EditItem: {
        screen: EditCopiedItemComponent
    },
    CreateItem: {
        screen: CreateCopiedItemComponent
    },
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});
