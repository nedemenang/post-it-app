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
import TitleBar from './TitleBar';
import MessageForm from './MessageForm';
import GroupForm from './GroupForm';
import AppAPI from '../utils/appAPI';
import AppStore from '../stores/AppStore';
import {AppBar, FlatButton} from 'material-ui'
import Notification from './notification';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
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
    
    this.state = getAppState();
  }

  render(){
    return(
      <div>
        <TitleBar />
        <MuiThemeProvider muiTheme={muiTheme}>
      <div className="row">
        <div className="leftColumn">
          <Drawer containerStyle={{height: 'calc(100% - 64px)', top: 64 }}>
          <GroupList selectedGroup= {this.state.selectedGroup} groups = {this.state.groups} loggedInUser = {this.state.loggedInUser} />
          <GroupForm loggedInUser = {this.state.loggedInUser}/>
          <UserList {...this.state} />
          </Drawer>
        </div>
        <div className="rightColumn">
          <MessageForm {...this.state} />
          <MessageList {...this.state}/>
          <Notification />
          </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }

  _onChange() {
     this.setState(getAppState());
   };

}

export default MessageBoard;