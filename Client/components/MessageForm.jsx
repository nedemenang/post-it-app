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

  const messagebody = this.refs.message.value.trim();
  const priority = this.ref.priority.value();
  const postedon = Date.now;
  
  let message = {
    message : messagebody,
    postedon: postedon,
    priority: priority,
    groupId: this.props.selectedGroupId
  }
  
  AppActions.addMessage(message); 
  //this.setState({error : AppStore.getErrors()});
  //console.log(AppStore.getErrors());
  
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
              <button className="messageButton" onClick={this.submit}>Submit</button>
         </form>
      </div>
    );
  }
}

export default MessageForm;