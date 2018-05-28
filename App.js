import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Spinner, View, Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import withNetworkConnectivity from 'react-native-offline/src/withNetworkConnectivity';

import { store, persistor } from './src/store';

import { CENTER } from './src/util/styles';
import { THEME } from './src/theme';
import AppRoutes from './src/routes';
import { SERVER_URL } from './src/services/constant.service';

export default class AppComponent extends React.Component {
  render() {
    const loader = (
      <View style={CENTER}>
        <Spinner color={THEME.PRIMARY} />
      </View>
    );

    const App = withNetworkConnectivity({
      withRedux: true,
      pingServerUrl: SERVER_URL,
      withExtraHeadRequest: false
    })(AppRoutes);

    return (
      <Provider store={store}>
        <PersistGate loading={loader} persistor={persistor}>
          <StatusBar
            backgroundColor={THEME.PRIMARY}
            barStyle="light-content"
          />
          <Root>
            <App />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
