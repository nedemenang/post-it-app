import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import io from 'socket.io-client';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import GroupList from './GroupList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import GroupForm from './GroupForm';
import AppAPI from '../utils/appAPI';
import AppStore from '../stores/AppStore';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';

const style = {margin: 5};
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

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser(),
      users: AppStore.getUsersNotInGroup(),
      groups: AppStore.getUserGroups(),
      messages: AppStore.getGroupMessages(),
      selectedGroup: AppStore.getSelectedGroup(),
      notifiedGroup: '',
      userReadMessages: AppStore.getUsersReadMessage(),
      open: false
    };
}


class MessageBoard extends Component {

getInitialState(){
      return getAppState();
  }


  connect(){
    //console.log(`Connected: ${this.socket.io}`);
  }

  handleRequestClose() {
    this.state.open = false;
  };

componentDidMount(){
    const user = localStorage.getItem('user');
    // console.log(JSON.parse(user).id);
    AppAPI.getUserGroups(JSON.parse(user).id);
    AppStore.addChangeListener(this._onChange.bind(this));
  }

componentUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  constructor(props){
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    //AppActions.receiveUserGroups();
    
    this.state = getAppState();
    //console.log(this.state.loggedInUser);
  }
  render(){
    return(
      <div className="row">
        <div className="leftColumn">
          <GroupList selectedGroup= {this.state.selectedGroup} groups = {this.state.groups} loggedInUser = {this.state.loggedInUser} />
          <GroupForm loggedInUser = {this.state.loggedInUser}/>
          <UserList {...this.state} />
        </div>
        <div className="rightColumn">
          <MessageForm {...this.state} />
          <br/>
          <br/>
          <MessageList {...this.state}/>
          
          </div>
          <div>
             <MuiThemeProvider muiTheme={muiTheme}>
               <Snackbar
                  open={this.state.open}
                  message={"New message added in " + this.state.notifiedGroup}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
              />
               </MuiThemeProvider>
            </div>
      </div>
    );
  }

  _onChange() {
     this.setState(getAppState());
   };

}

export default MessageBoard;