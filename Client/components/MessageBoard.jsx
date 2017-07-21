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

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser(),
      users: AppStore.getUsersNotInGroup(),
      groups: AppStore.getUserGroups(),
      messages: AppStore.getGroupMessages(),
      selectedGroup: AppStore.getSelectedGroup()
    };
}


class MessageBoard extends Component {

getInitialState(){
      return getAppState();
  }

// componentWillMount(){
//     this.socket = io('http://localhost:3000');
//     this.socket.on('connect', this.connect.bind(this));
//   }

  connect(){
    //console.log(`Connected: ${this.socket.io}`);
  }

componentDidMount(){

  this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect.bind(this));

    //console.log(this.state.groups);
    this.socket.on('userAddedToGroup', (group) => {
      if(group.groupId === this.state.selectedGroup.groupId)
        {
          AppAPI.getUsersNotInGroups(group);
        }
    });

    this.socket.on('messageAdded', (group) => {
      if(group.groupId === this.state.selectedGroup.groupId)
        {
          AppAPI.getGroupMessages(group);
        }
      AppAPI.getUserGroups();
    });

    this.socket.on('userAdded', () => {
      if(this.state.selectedGroup.groupId !== '' )
        {
          AppAPI.getUsersNotInGroups(this.state.selectedGroup);
        }
    });

    console.log('About to call appAPI')
    AppAPI.getUserGroups();
    AppStore.addChangeListener(this._onChange.bind(this));
  }

componentUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  constructor(props){
    super(props);
    //AppActions.receiveUserGroups();
    
    this.state = getAppState();
    //console.log(this.state.loggedInUser);
  }
  render(){
    return(
      <div className="row">
        <div className="leftColumn">
          <GroupList groups = {this.state.groups} />
          <GroupForm />
          <UserList {...this.state} />
        </div>
        <div className="rightColumn">
          <MessageList {...this.state}/>
          <MessageForm {...this.state} />
          </div>
        
      </div>
    );
  }

  _onChange() {
     this.setState(getAppState());
   };

}

export default MessageBoard;