import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import ls from 'local-storage';

class MessageForm extends Component {

submit(event){
  event.preventDefault();

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = mm + '/' + dd + '/' + yyyy;

  const messagebody = this.refs.message.value.trim();
  const priority = this.refs.priority.value.trim();
  const postedon = today;
  
  //console.log(this.props.selectedGroupId);
  
  if(this.props.selectedGroup.length === 0)
  {
    AppActions.receiveErrors('Please select a group to post a message');
    //console.log(this.props.errors);

  }else if(this.refs.message.value === '')
  {
    AppActions.receiveErrors('Please type in a message');
  }
  else if (this.refs.priority.value === 'Select Message Priority ....')
  {
    AppActions.receiveErrors('Please select a message priority');
  }else{
    //console.log(ls.get('user'));
    const user = ls.get('user');
    //console.log(user[0].email);
    let messageObject = {
      messageBody : messagebody,
      postedon: postedon,
      priority: priority,
      postedBy: user[0].email, //this.props.loggedInUser[0].email,
      postedByDisplayName: user[0].displayName,//this.props.loggedInUser[0].displayName,
      profilePic: user[0].profilePic,
      groupId: this.props.selectedGroup[0].groupId,
    }
    console.log(messageObject);

    AppActions.addMessage(messageObject);
    this.refs.message.value = '';
    this.refs.priority.value = 'Select Message Priority ....';
    AppActions.receiveErrors('');
  }
  
}

  constructor(props){
    super(props);
    this.state= {};
    this.submit = this.submit.bind(this);
  }
  render(){
    return(
      <div>
         <form>
           <input type="text" className="form-control" ref="message" placeholder="Please type a message. Press enter to submit." />
            <select ref="priority" className="form-select">
              <option>Select Message Priority ....</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
             </select>
             <p className="error">{this.props.errors}</p>
              <button className="messageButton" onClick={this.submit}>Submit</button>
         </form>
      </div>
    );
  }
}

export default MessageForm;