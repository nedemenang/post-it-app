import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageBoard from './MessageBoard';
import '../public/style.css';
import AppBar from 'material-ui/AppBar'
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
      registeredUser: AppStore.getRegisteredUser()
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

  constructor(props){
    super(props);
    this.state = getAppState();
  }

   render() {
     //console.log(this.state.errors)
     //<Login errors = {this.state.errors} />
      return (
         <div>
         <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Post It App" />
            </MuiThemeProvider>
             <MessageBoard />
         </div>
      );
   }

 _onChange() {
     this.setState(getAppState());
   };
  
}

export default App;
