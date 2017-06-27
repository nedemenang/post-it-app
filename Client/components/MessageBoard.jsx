import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
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
      users: AppStore.getUsersInGroup(),
      groups: AppStore.getUserGroups(),
      messages: AppStore.getGroupMessages(),
      selectedGroup: AppStore.getSelectedGroup()
    };
}


class MessageBoard extends Component {

getInitialState(){
      return getAppState();
  }

componentDidMount(){
    //console.log(this.state.loggedInUser);
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
          <UserList users = {this.state.users} />
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