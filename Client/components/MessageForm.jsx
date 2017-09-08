import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import { receiveErrors, addMessage } from '../actions/AppActions';


/**
 * @class MessageForm
 * @extends {Component}
 */
class MessageForm extends Component {

  /**
   * @param {object} event event object
   * @return {void} return void
   * @memberof MessageForm
   */
  submit(event) {
    event.preventDefault();

    const currentdate = new Date();
    const datetime = `${currentdate.getDate()}/${
                 currentdate.getMonth() + 1}/${
                 currentdate.getFullYear()} @ ${
                 currentdate.getHours()}:${
                 currentdate.getMinutes()}`;

    const messagebody = this.refs.message.value.trim();
    const priority = this.refs.priority.value.trim();
    const postedon = datetime;

    if (this.props.selectedGroup.length === 0) {
      receiveErrors('Please select a group to post a message');
    } else if (this.refs.message.value === '') {
      receiveErrors('Please type in a message');
    } else if (this.refs.priority.value === 'Select Message Priority ....') {
      receiveErrors('Please select a message priority');
    } else {
      if (this.props.selectedGroup[0].groupId !== undefined) {
        const user = localStorage.getItem('user');
        const messageObject = {
          messageBody: messagebody,
          postedon,
          priority,
          postedBy: JSON.parse(user).email,
          postedByDisplayName: JSON.parse(user).displayName,
          profilePic: JSON.parse(user).profilePic,
          groupId: this.props.selectedGroup[0].groupId,
          groupName: this.props.selectedGroup[0].groupname
        };
        addMessage(messageObject);
      }
      this.refs.message.value = '';
      this.refs.priority.value = 'normal';
      receiveErrors('');
    }
  }

  /**
   * Creates an instance of MessageForm.
   * @param {object} props
   * @memberof MessageForm
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  /**
   * Renders message form page
   * @returns {JSX} Returns message form page
   * @memberof MessageForm
   */
  render() {
    return (
      <div className="footer">
         <form id="chatform">
         <select ref="priority" className="form-select">
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
             </select>
           <textarea type="text" id="message" ref="message"
           placeholder="Please type a message." />
              <button id="submit" onClick={this.submit}>Submit</button>
         </form>
      </div>
    );
  }
}

export default MessageForm;
