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

  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

  const messagebody = this.refs.message.value.trim();
  const priority = this.refs.priority.value.trim();
  const postedon = datetime;
  
  if(this.props.selectedGroup.length === 0)
  {
    AppActions.receiveErrors('Please select a group to post a message');

  }else if(this.refs.message.value === '')
  {
    AppActions.receiveErrors('Please type in a message');
  }
  else if (this.refs.priority.value === 'Select Message Priority ....')
  {
    AppActions.receiveErrors('Please select a message priority');
  }else{
    if(this.props.selectedGroup[0].groupId !== undefined)
    {
      const user = localStorage.getItem('user');
      let messageObject = {
        messageBody : messagebody,
        postedon: postedon,
        priority: priority,
        postedBy: JSON.parse(user).email, 
        postedByDisplayName: JSON.parse(user).displayName,
        profilePic: JSON.parse(user).profilePic,
        groupId: this.props.selectedGroup[0].groupId,
        groupName: this.props.selectedGroup[0].groupname
      }
      AppActions.addMessage(messageObject);
    }
    this.refs.message.value = '';
    this.refs.priority.value = 'normal';
    AppActions.receiveErrors('');
  }
}

  /**
   * Creates an instance of MessageForm.
   * @param {object} props 
   * @memberof MessageForm
   */
  constructor(props){
    super(props);
    this.state= {};
    this.submit = this.submit.bind(this);
  }

  /**
   * 
   * Renders message form page
   * @returns {JSX} Returns message form page 
   * @memberof MessageForm
   */
  render(){
    return(
      <div className="footer">
         <form id="chatform">
         <select ref="priority" className="form-select">
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
             </select>
           <textarea type="text" id="message" ref="message" placeholder="Please type a message." />
              <button id="submit" onClick={this.submit}>Submit</button>
         </form>
      </div>
    );
  }
}

export default MessageForm;