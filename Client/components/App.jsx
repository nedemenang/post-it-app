import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageBoard from './MessageBoard';
import PasswordReset from './passwordReset';
import LoginMessageBoard from './LoginMessageBoard';
import PasswordResetConfirm from './PasswordResetConfirm';
import ProfileEdit from './ProfileEdit';
import '../public/style.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ls from 'local-storage';

injectTapEventPlugin();

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

class App extends Component {
/**
  * @return {function} getappstate function
  */
  getInitialState(){
      return getAppState();
  }

  /**
  * @return {void} return void
  */
  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this));
  }

  /**
  * @return {void} return void
  */
componentUnmount() {
  AppStore.removeChangeListener(this._onChange.bind(this));
}

/**
 * @param {object} props props objects
  * @return {void} return void
  */
  constructor(props){
    super(props);
    this.state = getAppState();

  }

  /**
  * @return {JSX} App page
  */
   render() {

      return (
        <BrowserRouter>
         <div>
         
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
            <ProfileEdit  {...this.state} />
          )} />
          <Route render = { () => (
            <p> Sorry, something went wrong... </p>
          )} />
        </Switch>
      </div>
        </BrowserRouter>
      );
   }

   /**
  * @return {void} return void
  */
 _onChange() {
     this.setState(getAppState());
   };
  
}

export default App;
