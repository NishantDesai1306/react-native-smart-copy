import React from 'react';
import { connect } from 'react-redux';
import { grey } from 'material-colors';
import { View, ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import { Icon } from 'native-base';

import AppBar from '../../../shared/app-bar';
import { logout } from '../../../../services/auth.service';
import { FLEX_1 } from '../../../../util/styles';
import { settingsItem, settingsTitle } from './styles';

class SettingsComponent extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon 
        ios='ios-menu'
        android="md-settings"
        style={{ fontSize: 20, color: tintColor }}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    logout()
    .then(() => {
      this.props.navigation.navigate('Login');
    })
    .catch((err) => {
      ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
    });
  }

  render() {
    const { user } = this.props;

    return (
      <View style={FLEX_1}>
        <AppBar title={'Settings'} />
        <SettingsList borderColor={grey['300']} backgroundColor={null} defaultItemSize={50}>
          <SettingsList.Item
            hasNavArrow={false}
            title='Account'
            titleStyle={settingsTitle}
            itemWidth={50}
            borderHide={'Both'}
          />
          <SettingsList.Item
            hasNavArrow={false}
            itemWidth={60}
            borderHide={'Both'}
            
            titleStyle={settingsItem.titleStyle}
            title='Your Account'
            
            icon={
              <View style={settingsItem.iconContainer}>
                <Icon 
                  style={settingsItem.icon} 
                  name='person' 
                />
              </View>
            }

            onPress={() => this.props.navigation.navigate('AccountDetails')}
            
            titleInfo={`Signed in as ${user.username}`}
            titleInfoPosition='Bottom'
            titleInfoStyle={settingsItem.titleInfoStyle}
          />
          <SettingsList.Item
            hasNavArrow={false}
            itemWidth={60}
            borderHide={'Bottom'}
            
            titleStyle={settingsItem.titleStyle}
            title='Change Password'
            
            icon={
              <View style={settingsItem.iconContainer}>
                <Icon 
                  style={settingsItem.icon} 
                  name='key' 
                />
              </View>
            }
  
            onPress={() => this.props.navigation.navigate('ChangePassword')}
          />
          <SettingsList.Item
            hasNavArrow={false}
            itemWidth={60}
            borderHide={'Bottom'}
            
            titleStyle={settingsItem.titleStyle}
            title='Logout'
            
            icon={
              <View style={settingsItem.iconContainer}>
                <Icon 
                  style={settingsItem.icon} 
                  name='exit' 
                />
              </View>
            }
  
            onPress={this.logout}
          />
        </SettingsList>
      </View>
    );
  }
}

const dashboardWithNav = withNavigation(SettingsComponent);

function mapStateToProps({ user }) {
  return {
    user
  };
}
const connectedSettingsComponent = connect(mapStateToProps, null)(dashboardWithNav);

export default connectedSettingsComponent;
