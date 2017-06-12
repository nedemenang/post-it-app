import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';



class Message extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <div className="well">
         <strong>Message</strong>
      </div>
    );
  }
}

export default Message;