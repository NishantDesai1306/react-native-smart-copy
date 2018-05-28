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
  Col,
  Spinner,
  Container
} from 'native-base';

import Styles from './styles';
import { 
  HORIZONTALLY_CENTER,
  FLEX_1,
  MT_20,
  EMPTY,
  CENTER,
  FLEX_4
} from '../../../util/styles';
import { REDUX_FORM_KEYS } from '../../../services/constant.service';
import { login, validateEmail } from '../../../services/auth.service';
import { getUserDetails } from '../../../services/user.service';
import { THEME } from '../../../theme';
import renderInput from '../../shared/input';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      validatingToken: true,
      loggingIn: false
    };

    this.login = this.login.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

  componentWillMount() {
    getUserDetails()
    .then((data) => {
      if (data) {
        this.navigateTo('Dashboard');
      }
    })
    .catch(() => {
      this.setState({
        validatingToken: false
      });
    });
  }

  componentWillReceiveProps(newProps) {
    const { network } = newProps;
    if (network && !network.isConnected) {
      return this.navigateTo('Offline');
    }
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

  login() {
    const { loginDetails } = this.props;

    this.setState({
      loggingIn: true
    });

    login(loginDetails.values)
    .then(({ reason }) => {
      if (reason) {
        const text = reason.message || reason;
        ToastAndroid.show(text, ToastAndroid.SHORT);
        this.setState({
          loggingIn: false
        });
      } else {
        this.navigateTo('Dashboard');
      }
    })
    .catch((err) => {
      const text = err.message || err;
      ToastAndroid.show(text, ToastAndroid.SHORT);
      this.setState({
        loggingIn: false
      });
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
    const { validatingToken, loggingIn } = this.state;

    if (validatingToken) {
      return (
        <View style={CENTER}>
          <Spinner color={THEME.PRIMARY} />
        </View>
      );
    }

    return (
      <Container>
        <View style={Styles.container}>
          <View style={FLEX_1} />
          <View style={FLEX_4}>
            <Grid style={[Styles.titleGrid]}>
              <Col 
                size={40} 
                style={Styles.titleIcon} 
              >
                <Icon style={Styles.title} name='person' />
              </Col>
              <Col size={60}>
                <Text style={Styles.title}>Login</Text>
              </Col>
            </Grid>

            <ScrollView>
              <View style={MT_20}>
                <Field 
                  name='email'
                  keyboardType='email-address'
                  label='Email'
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
              </View>
              <View style={Styles.buttonGroupContainer}>
                <View style={Styles.buttonContainer}>
                  <Button 
                    style={[submitButtonStyle.container]} 
                    disabled={disableSubmitButton} 
                    onPress={this.login}
                  >
                    <View style={HORIZONTALLY_CENTER}>
                      { 
                        loggingIn ? (
                          <Spinner color={THEME.PRIMARY} />
                        ) : (
                          <Text style={submitButtonStyle.text}>
                            Login
                          </Text>
                        ) 
                      }
                    </View>
                  </Button>
                </View>
                <View style={[Styles.buttonContainer, MT_20]}>
                  <Button 
                    style={Styles.submitButton} 
                    onPress={() => { this.props.navigation.navigate('Registration'); }}
                  >
                    <View style={HORIZONTALLY_CENTER}>
                      <Text style={Styles.submitButtonText}>Register</Text>
                    </View>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

const validate = (values, { loginDetails }) => {
  const error = {
    email: '',
    password: ''
  };

  let {
    email,
    password
  } = values;

  if (values.email === undefined) {
    email = '';
  }
  if (values.password === undefined) {
    password = '';
  }

  if (email.length < 8 && email !== '') {
    error.email = 'email is invalid';
  }
  if (!email.includes('@') && email !== '') {
    error.email = '@ not included';
  }

  if (
      !password &&
      loginDetails &&
      loginDetails.fields &&
      loginDetails.fields.password &&
      loginDetails.fields.password
  ) {
    error.password = 'password cannot be empty';
  }

  return error;
};

const asyncValidate = (values) => {
  const {
    email
  } = values;
  
  if (!email) {
    return Promise.resolve();
  }

  return validateEmail(email)
  .then(({ data, reason }) => {
    if (data) {
      return Promise.reject({
        email: 'This email is not registered'
      });
    }
    if (reason) {
      return Promise.reject(reason);
    }
  });
};

const reduxLoginForm = reduxForm({
  form: REDUX_FORM_KEYS.LOGIN,
  validate,
  asyncValidate,
  asyncChangeFields: ['email']
})(LoginComponent);

const loginFormWithNav = withNavigation(reduxLoginForm);

function mapStateToProps(state) {
  const { form, network } = state;

  return {
    loginDetails: form && form[REDUX_FORM_KEYS.LOGIN],
    network,
  };
}
const connectedLoginForm = connect(mapStateToProps, null)(loginFormWithNav);

export default connectedLoginForm;
