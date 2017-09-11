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
    const messagebody = this.state.message;
    const priority = this.state.priority;
    const postedon = (new Date()).toLocaleString('en-GB');

    if (this.props.selectedGroup.length === 0) {
      receiveErrors('Please select a group to post a message');
    } else if (this.state.message === '') {
      receiveErrors('Please type in a message');
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

      this.setState({
        message: '',
        priority: 'normal'
      });
      receiveErrors('');
    }
  }

  /**
   * Set message state when user types
   * @param {object} event event object
   * @memberof MessageForm
   * @returns {void} returns void
   */
  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }


  /**
   * Set priority state when user selection changes
   * @param {object} event event object
   * @memberof MessageForm
   */
  handlePriorityChange(event) {
    this.setState({ priority: event.target.value });
  }

  /**
   * Creates an instance of MessageForm.
   * @param {object} props
   * @memberof MessageForm
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      priority: 'normal'
    };
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
         <select ref="priority" value={this.state.priority}
         className="form-select"
         onChange={ this.handlePriorityChange.bind(this) }>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
             </select>
           <textarea type="text"
           onChange={ this.handleMessageChange.bind(this) }
           id="message" value={this.state.message}
           placeholder="Please type a message." />
              <button id="submit" onClick={this.submit}>Submit</button>
         </form>
      </div>
    );
  }
}

export default MessageForm;
