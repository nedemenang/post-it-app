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


class MessageBoard extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <div className="row">
      <div className="col-md-4">
          <GroupList/>
          <UserList />
      </div>
      <div className="col-md-8">
          <MessageList/>
          <MessageForm />
      </div>
</div>
    );
  }
}

export default MessageBoard;