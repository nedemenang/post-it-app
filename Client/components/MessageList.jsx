import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import Message from './Message';


class MessageList extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <div className="well">
          <h3>Messages</h3>
          {
            this.props.messages.map((message, i) => {
                  return <Message message={message} key={i} />
              })
          }
      </div>
    );
  }
}

export default MessageList;