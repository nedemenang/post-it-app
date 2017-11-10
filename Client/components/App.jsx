import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green100, green500, green700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppStore from '../stores/AppStore';
import PasswordReset from './passwordReset';
import LoginMessageBoard from './LoginMessageBoard';
import PasswordResetConfirm from './PasswordResetConfirm';
import ProfileEdit from './ProfileEdit';
import '../public/style.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
});

injectTapEventPlugin();

  /**
  * @return {objects} state objects
  */
function getAppState() {
  return {
    errors: AppStore.getErrors(),
    success: AppStore.getSuccess(),
    loggedInUser: AppStore.getLoggedInUser(),
    registeredUser: AppStore.getRegisteredUser(),
    isAuthenticated: AppStore.getIsAuthenticated()
  };
}

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {

  /**
  * @param {object} props props objects
  * @return {void} return void
  */
  constructor(props) {
    super(props);
    this.state = getAppState();
  }

  /**
  * @return {void} return void
  */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange.bind(this));
  }

  /**
  * @return {void} return void
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange.bind(this));
  }

  /**
  * @return {void} return void
  */
  onChange() {
    this.setState(getAppState());
  }

  /**
  * @return {JSX} App page
  */
  render() {
    return (
        <BrowserRouter>
         <div>
         <MuiThemeProvider muiTheme={muiTheme}>
        <Switch>
          <Route exact path = '/' render = {() => (
            <LoginMessageBoard />
          )} />
          <Route exact path = '/PasswordReset' render = {() => (
            <PasswordReset {...this.state} />
          )} />
          <Route path = '/PasswordResetConfirm' render = {() => (
            <PasswordResetConfirm {...this.state} />
          )} />
          <Route path = '/ProfileEdit' render = {() => (
            <ProfileEdit {...this.state} />
          )} />
          <Route render = { () => (
            <p> Sorry, something went wrong... </p>
          )} />
        </Switch>
        </MuiThemeProvider>
      </div>
        </BrowserRouter>
    );
  }

}

export default App;
