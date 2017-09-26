import React, { Component } from 'react';
import '../public/style.css';
import { getUsersReadMessage } from '../utils/appAPI';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/icomoon/checkmark';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = { margin: 5 };

/**
 * @class Message
 *
 * @extends {Component}
 */
class Message extends Component {
  /**
   * Gets user that read a message on click
   *
   * @param {object} event event object
   *
   * @memberof Message
   */
  messageClicked(event) {
    this.setState({
      openPopUp: true,
      anchorEl: event.currentTarget,
    });

    const item = {
      groupId: this.props.groupId,
      messageId: this.props.message.id
    };
    getUsersReadMessage(item);
  }

  /**
   * Sets the open pop up state to false
   *
   * @return {void} return void
   *
   * @memberof Message
   */
  handleRequestClose() {
    this.setState({
      openPopUp: false,
    });
  }

  /**
   * Creates an instance of Message.
   *
   * @param {object} props event object
   *
   * @return {void} return void
   *
   * @memberof Message
   */
  constructor(props) {
    super(props);
    this.messageClicked = this.messageClicked.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      openPopUp: false,
    };
  }
  /**
   * renders components
   *
  * @return {JSX} returns message page
  */
  render() {
    let isRead = '';
    if (this.props.message.isRead === true) {
      isRead = <Icon icon={checkmark} />;
    }

    return (
      <div>
        <ListItem onTouchTap={this.messageClicked} leftAvatar={
        <Avatar
          src={this.props.message.profilePic}
          size={30}
          style={style}
        />
      }>
          <strong>{isRead} {this.props.message.messageBody}</strong><br/>
          <p><small>
            {this.props.message.postedBy} - {this.props.message.postedon}
            </small></p>
        </ListItem>
        <Popover
          open={this.state.openPopUp}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
          {this.props.userRead.map((user, i) =>
            <MenuItem key={i} primaryText={user.email} />
          )}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default Message;
