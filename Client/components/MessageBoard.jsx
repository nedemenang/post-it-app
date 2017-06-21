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
import AppStore from '../stores/AppStore';

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser(),
      users: AppStore.getUsers(),
      groups: AppStore.getGroups(),
      messages: AppStore.getMessages()
    };
}


class MessageBoard extends Component {

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
  render(){
    return(
      <div className="row">
      <div className="col-md-4">
          <GroupList groups = {this.state.groups} />
          <UserList users = {this.state.users} />
      </div>
      <div className="col-md-8">
          <MessageList messages = {this.state.messages}/>
          <MessageForm />
      </div>
</div>
    );
  }

  _onChange() {
     this.setState(getAppState());
   };

}

export default MessageBoard;