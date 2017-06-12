import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';



class MessageForm extends Component {

submit(event){
  event.preventDefault();
  
}

  constructor(props){
    super(props);
    this.state= {};
    this.submit = this.submit.bind(this);
  }
  render(){
    return(
      <div>
         <form onSubmit={this.submit}>
              <input type="text" className="form-control" ref="message" placeholder="Please type a message" />
         </form>
      </div>
    );
  }
}

export default MessageForm;