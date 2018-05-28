import React from 'react';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import { View } from 'react-native';
import { 
  Text,
  Icon
} from 'native-base';

import * as Styles from './styles';

class OfflineComponent extends React.Component {

    componentWillReceiveProps(newProps) {
        const { network } = newProps;

        if (network && network.isConnected) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            });
            
            this.props.navigation.dispatch(resetAction);
        }
    }
    
    render() {
        return (
            <View style={Styles.mainContainer}>
                <Icon 
                    type='MaterialIcons'
                    name='error' 
                    style={Styles.icon} 
                />
                <Text style={Styles.text}> 
                    You are offline, Please turn on Wifi or Cellular Data to use this app.
                </Text>
            </View>
        );
    }
}

const offlineWithNavigation = withNavigation(OfflineComponent);

function mapStateToProps(state) {
    const { network } = state;
  
    return {
        network,
    };
}

export default connect(mapStateToProps, null)(offlineWithNavigation);
