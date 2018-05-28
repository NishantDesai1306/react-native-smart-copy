import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { View, ToastAndroid, Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import { 
  Icon, Button
} from 'native-base';

import AppBar from '../../../../shared/app-bar';
import { FLEX_1 } from '../../../../../util/styles';
import * as Styles from './styles';
import * as CopiedItemsService from '../../../../../services/copied-item.service';
import { THEME } from '../../../../../theme';
import renderInput from '../../../../shared/input';
import { REDUX_FORM_KEYS } from '../../../../../services/constant.service';

class CreateCopiedItemComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentKeyboardHeight: 0
    };

    this.onSave = this.onSave.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);

    this.additionalButtons = (
      <Button transparent onPress={this.onSave}>
        <Icon type='MaterialIcons' style={{ color: THEME.TEXT_LIGHT }} name='save' />
      </Button>
    );
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async onSave() {
    const { 
      navigation,
      createItemDetails: {
        values: {
          item
        }
      }
    } = this.props;

    if (!item) {
      ToastAndroid.show('Value cannot be empty', ToastAndroid.SHORT);      
      return;
    }

    try {
      await CopiedItemsService.createItem(item);
      ToastAndroid.show('Item created successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (err) {
      ToastAndroid.show(err.message || err, ToastAndroid.SHORT);
    }
  }

  keyboardDidShow(e) {
    this.setState({
      currentKeyboardHeight: e.endCoordinates.height
    });
  }

  keyboardDidHide() {
    this.setState({
      currentKeyboardHeight: 0
    });
  }

  render() {
    const fieldInputStyle = Object.assign({}, Styles.fieldInput);
    const { currentKeyboardHeight } = this.state;
    fieldInputStyle.height -= currentKeyboardHeight;

    return (
      <View style={[FLEX_1, Styles.container]}>
        <AppBar goBack title='Create Item' additionalButton={this.additionalButtons} />

        <Field 
          name='item'
          label=''
          type='textarea'
          noValidate
          styles={{
            fieldContainer: Styles.fieldContainer,
            field: Styles.field,
            fieldInput: fieldInputStyle,
            fieldText: Styles.fieldText,
            fieldErrorText: Styles.fieldErrorText,
            spinnerColor: THEME.TEXT_LIGHT
          }}
          component={renderInput}
        />
      </View>
    );
  }
}

const reduxEditForm = reduxForm({
  form: REDUX_FORM_KEYS.CREATE_COPIED_ITEM,
})(CreateCopiedItemComponent);

const componentWithNav = withNavigation(reduxEditForm);

function mapStateToProps({ form }) {
  return {
    createItemDetails: form && form[REDUX_FORM_KEYS.CREATE_COPIED_ITEM],
    initialValues: {
      item: 'item'
    }
  };
}
const connectedComponent = connect(mapStateToProps, null)(componentWithNav);

export default connectedComponent;
