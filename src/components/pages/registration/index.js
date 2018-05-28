import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';
import { 
  Button,
  Text,
  Icon,
  Grid,
  Col
} from 'native-base';

import Styles from './styles';
import {  
  HORIZONTALLY_CENTER, 
  FLEX_1,
  FLEX_4,
  EMPTY
} from '../../../util/styles';
import { register, validateEmail, validateUsername } from '../../../services/auth.service';
import { REDUX_FORM_KEYS } from '../../../services/constant.service';
import { THEME } from '../../../theme';
import renderInput from '../../shared/input';

class RegistrationComponent extends React.Component {

  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName })
      ]
    });
    
    this.props.navigation.dispatch(resetAction);
  }

  register() {
    const { registrationDetails } = this.props;

    register(registrationDetails.values)
    .then(({ reason }) => {
      if (reason) {
        const text = reason.message || reason;
        ToastAndroid.show(text, ToastAndroid.SHORT);
      } else {
        this.navigateTo('Dashboard');
      }
    })
    .catch((err) => {
      ToastAndroid.show(err.message || err, ToastAndroid.SHORT);
    });
  }

  render() {
    const { pristine, submitting, valid } = this.props;
    const disableSubmitButton = pristine || submitting || !valid;
    const submitButtonStyle = {
      container: Object.assign({},
          Styles.submitButton,
          disableSubmitButton ? { backgroundColor: THEME.DISABLED_TEXT } : EMPTY
      ),
      text: Object.assign({},
          Styles.submitButtonText,
          disableSubmitButton ? { color: THEME.TEXT_DARK } : EMPTY
      )
    };
  
    return (
      <View style={Styles.container}>
        <View style={FLEX_1} />
        <View style={FLEX_4}>
          <Grid style={Styles.titleGrid}>
            <Col 
              size={35} 
              style={Styles.titleIcon} 
            >
              <Icon style={Styles.title} name='person' />
            </Col>
            <Col size={65}>
              <Text style={Styles.title}>Register</Text>
            </Col>
          </Grid>

          <ScrollView>
            <View>
              <Field 
                name='username'
                label='Username'
                type='text'
                isFirst
                styles={{
                  field: Styles.field,
                  fieldInput: Styles.fieldInput,
                  fieldText: Styles.fieldText,
                  fieldErrorText: Styles.fieldErrorText,
                  spinnerColor: THEME.TEXT_LIGHT
                }}
                component={renderInput}
              />
              <Field 
                name='email'
                label='Email'
                keyboardType='email-address'
                type='text'
                styles={{
                  field: Styles.field,
                  fieldInput: Styles.fieldInput,
                  fieldText: Styles.fieldText,
                  fieldErrorText: Styles.fieldErrorText,
                  spinnerColor: THEME.TEXT_LIGHT
                }}
                component={renderInput}
              />
              <Field
                name='password'
                label='Password'
                type='password'
                styles={{
                  field: Styles.field,
                  fieldInput: Styles.fieldInput,
                  fieldText: Styles.fieldText,
                  fieldErrorText: Styles.fieldErrorText
                }}
                component={renderInput} 
              />
              <Field
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                styles={{
                  field: Styles.field,
                  fieldInput: Styles.fieldInput,
                  fieldText: Styles.fieldText,
                  fieldErrorText: Styles.fieldErrorText
                }}
                component={renderInput} 
              />
            </View>

            <View style={Styles.buttonGroupContainer}>
              <View style={[Styles.buttonContainer]}>
                <Button 
                  disabled={disableSubmitButton}
                  style={submitButtonStyle.container} 
                  onPress={this.register}
                >
                  <View style={HORIZONTALLY_CENTER}>
                    <Text style={submitButtonStyle.text}>Create Account</Text>
                  </View>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const validate = (values, { registrationDetails }) => {
  const error = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  let {
    username,
    email,
    password,
    confirmPassword
  } = values;

  if (values.username === undefined) {
    username = '';
  }
  if (values.email === undefined) {
    email = '';
  }
  if (values.password === undefined) {
    password = '';
  }
  if (values.password === undefined) {
    password = '';
  }
  if (values.confirmPassword === undefined) {
    confirmPassword = '';
  }

  if (email.length < 8 && email !== '') {
    error.email = 'email is invalid';
  }
  if (!email.includes('@') && email !== '') {
    error.email = '@ not included';
  }

  if (
    !username &&
    registrationDetails &&
    registrationDetails.fields &&
    registrationDetails.fields.username &&
    registrationDetails.fields.username
  ) {
    error.username = 'username cannot be empty';
  } else if (username.length < 5) {
    error.username = 'username should have at least 5 characters';
  }

  if (
      !password &&
      registrationDetails &&
      registrationDetails.fields &&
      registrationDetails.fields.password &&
      registrationDetails.fields.password
  ) {
    error.password = 'password cannot be empty';
  }

  if (
    !confirmPassword &&
    registrationDetails &&
    registrationDetails.fields &&
    registrationDetails.fields.confirmPassword &&
    registrationDetails.fields.confirmPassword
  ) {
    error.confirmPassword = 'repeat your password';
  }

  if (password !== confirmPassword) {
    error.confirmPassword = 'password and confirm password must match';
  }

  return error;
};

const asyncValidate = (values) => {
  const {
    email,
    username
  } = values;
  
  return Promise.all([
    email ? validateEmail(email) : Promise.resolve({ data: true }),
    username ? validateUsername(username) : Promise.resolve({ data: true })
  ])
  .then(([
    { data: isEmailValid, reason: emailError }, 
    { data: isUsernameValid, reason: usernameError }
  ]) => {
    const errors = {};

    if (isEmailValid === false) {
      errors.email = 'This email is already registered';
    }
    if (emailError) {
      errors.email = emailError;
    }

    if (isUsernameValid === false) {
      errors.username = 'This username is already taken';
    }
    if (usernameError) {
      errors.username = usernameError;
    }

    throw errors;
  });
};

const reduxRegistrationForm = reduxForm({
  form: REDUX_FORM_KEYS.REGISTRATION,
  validate,
  asyncValidate,
  asyncChangeFields: ['username', 'email']
})(RegistrationComponent);

const registrationFormWithNav = withNavigation(reduxRegistrationForm);

function mapStateToProps({ form }) {
  return {
    registrationDetails: form && form[REDUX_FORM_KEYS.REGISTRATION]
  };
}
const connectedRegistrationForm = connect(mapStateToProps, null)(registrationFormWithNav);

export default connectedRegistrationForm;
