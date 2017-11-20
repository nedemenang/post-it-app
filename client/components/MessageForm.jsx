import React, { Component } from 'react';
import '../public/style.scss';
import { receiveErrors, addMessage } from '../actions/AppActions';
import lodash from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Icon from 'react-icons-kit';
import { send } from 'react-icons-kit/fa/send'; 

const style = {
  minWidth: 35
};

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
    const postedOn = (new Date()).toLocaleString('en-GB');

    if (lodash.isEmpty(this.props.selectedGroup)) {
      receiveErrors('Please select a group to post a message');
    } else if (this.state.message === '') {
      receiveErrors('Please type in a message');
    } else {
      if (this.props.selectedGroup.groupId !== undefined) {
        const user = localStorage.getItem('user');
        const messageObject = {
          messageBody: messagebody,
          postedOn,
          priority,
          postedBy: JSON.parse(user).email,
          postedByDisplayName: JSON.parse(user).displayName,
          profilePic: JSON.parse(user).photoURL,
          groupId: this.props.selectedGroup.groupId,
          groupName: this.props.selectedGroup.groupName
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
           <FlatButton
           style={style}
            icon={<Icon style={{ color: '#4CAF4F' }} icon={send} />}
            onClick={this.submit}
            />
         </form>
      </div>
    );
  }
}

export default MessageForm;
