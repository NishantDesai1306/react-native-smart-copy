import React from 'react';
import { connect } from 'react-redux';
import { View, ToastAndroid, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { 
  Text, Icon, Button, List, ListItem, Left, Body, Right, Spinner, Fab
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
} from 'react-native-popup-menu';

import { store as Store } from '../../../../store';
import { selectForEdit } from '../../../../actions/copied-item.actions';
import AppBar from '../../../shared/app-bar';
import { ML_10, FLEX_1, HORIZONTALLY_CENTER, MT_20, CENTER, FLEX_5 } from '../../../../util/styles';
import * as Styles from './styles';
import * as CopiedItemsService from '../../../../services/copied-item.service';
import { THEME } from '../../../../theme';
import { REDUX_FORM_KEYS } from '../../../../services/constant.service';

class DashboardComponent extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon 
        ios='ios-home'
        android="md-home"
        style={{ fontSize: 20, color: tintColor }}
      />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingItems: true
    };

    this.loadItems = this.loadItems.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.additionalButtons = (
      <Button key='sync' transparent onPress={this.loadItems}>
        <Icon style={{ color: THEME.TEXT_LIGHT }} name='sync' />
      </Button>
    );
  }

  componentWillMount() {
    this.loadItems();
  }

  async onDelete(_id) {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this item ?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => this.deleteItem(_id) },
      ],
      { cancelable: false }
    );
  }

  async onEdit(_id) {
    const action = selectForEdit(_id);
    
    Store.dispatch(action);
    this.props.navigation.navigate('EditItem');
  }

  async onCreate() {
    this.props.navigation.navigate('CreateItem');
  }

  async deleteItem(_id) {
    try {
      await CopiedItemsService.deleteItem(_id);
      ToastAndroid.show('Item deleted successfully', ToastAndroid.SHORT);      
    } catch (e) {
      ToastAndroid.show(e.message || e, ToastAndroid.SHORT);
    }
  }

  async loadItems() {
    ToastAndroid.show('Loading Items', ToastAndroid.SHORT);    

    try {
      await CopiedItemsService.getCopiedItems();

      this.setState({
        loadingItems: false
      });
    } catch (err) {
      const text = err.message || err;
      
      ToastAndroid.show(text, ToastAndroid.SHORT);
      this.setState({
        loadingItems: false
      });
    }
  }

  render() {
    const { copiedItems, searchBarForm } = this.props;
    const { loadingItems } = this.state;
    const searchValue = searchBarForm && searchBarForm.values && searchBarForm.values.searchValue;
    let content = null;

    if (loadingItems) {
      content = (
        <View style={CENTER}>
          <Spinner color={THEME.PRIMARY} />
        </View>
      );
    } else if (copiedItems && copiedItems.items && copiedItems.items.length) {
      content = (
        <List dataArray={copiedItems.items} >
          {
            copiedItems.items
              .filter(({ value }) => (searchValue ? value.includes(searchValue) : true))
              .map(({ value, _id, updatedAt }) => (
              <ListItem 
                avatar 
                key={`${_id}-${updatedAt}`} 
                style={{ height: Styles.listItemHeight }}
              >
                <Left style={[CENTER, { height: Styles.listItemHeight }]}>
                  <View style={[Styles.avatarContainer, CENTER]}>
                    <Text style={Styles.avatarText}>
                      {value.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </Left>
                <Body style={Styles.listItemText}>
                  <Text>{value}</Text>
                </Body>
                <Right style={[Styles.listItemOptions, CENTER]}>
                  <Menu>
                    <MenuTrigger
                      children={
                        <Text style={Styles.listItemOptionsTrigger}>
                          <Icon name='more' />
                        </Text>
                      }
                    />
                    <MenuOptions>
                      <MenuOption 
                        style={[Styles.menuOptions, CENTER]} 
                        onSelect={() => this.onEdit(_id)}
                      >
                        <Icon name='create' style={FLEX_1} />
                        <Text style={FLEX_5}>Edit</Text>
                      </MenuOption>
                      <MenuOption 
                        style={[Styles.menuOptions, CENTER]} 
                        onSelect={() => this.onDelete(_id)}
                      >
                        <Icon name='trash' style={[FLEX_1, { color: THEME.ERROR_TEXT }]} />
                        <Text style={[FLEX_5, { color: THEME.ERROR_TEXT }]}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </Right>
              </ListItem>
            ))
          }
        </List>
      );
    } else {
      content = (
        <View style={[HORIZONTALLY_CENTER, MT_20]}>
          <Text style={[ML_10, Styles.welcomeText]}>
            No items found.
          </Text>
        </View>
      );
    } 

    return (
      <View style={[FLEX_1, Styles.container]}>
        <AppBar isSearchable additionalButton={this.additionalButtons} />
        
        <MenuContext>
          {content}
        </MenuContext>

          <Fab
            active
            direction="up"
            style={{ backgroundColor: THEME.PRIMARY }}
            position="bottomRight"
            onPress={this.onCreate}
          >
            <Icon name="add" />
          </Fab>
      </View>
    );
  }
}

const componentWithNav = withNavigation(DashboardComponent);

function mapStateToProps(state) {
  const { user, copiedItems, form } = state;

  return {
    user,
    copiedItems,
    searchBarForm: form && form[REDUX_FORM_KEYS.SEARCH_BAR]
  };
}
const connectedComponent = connect(mapStateToProps, null)(componentWithNav);

export default connectedComponent;
