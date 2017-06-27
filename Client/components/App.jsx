import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageBoard from './MessageBoard';
import '../public/style.css';
import {AppBar, FlatButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
//import UserList from './UserList';
//import GroupList from './GroupList';
//import MessageList from './MessageList'; 

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
  //userAgent: req.headers['user-agent'],
});

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

  getInitialState(){
      return getAppState();
  }

  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this));
  }

componentUnmount() {
  AppStore.removeChangeListener(this._onChange.bind(this));
}

signOut(event){
  event.preventDefault();
  AppActions.signOutUser();
}

  constructor(props){
    super(props);
    this.state = getAppState();
    this.signOut = this.signOut.bind(this);
  }

   render() {
     //console.log(this.state.errors)
     //<Login errors = {this.state.errors} />
     //console.log(this.state.isAuthenticated);
     if(this.state.isAuthenticated == false) {
       var componentToMount = <Login {...this.state} />
     } else {
       var componentToMount = <MessageBoard />
     }

     const rightButtons = (
      <div>
        <FlatButton label="Sign Out" />
      </div>
    );

      return (
         <div>
         <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Post It App" iconElementRight={<button className="googleButton" onClick={this.signOut}>Sign Out</button>}/>
            </MuiThemeProvider>
             {componentToMount}
         </div>
      );
   }

 _onChange() {
     this.setState(getAppState());
   };
  
}

export default App;
