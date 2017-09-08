import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import Message from './Message';
import { List, Subheader } from 'material-ui';

/**
 * @class MessageList
 * @extends {Component}
 */
class MessageList extends Component {

  /**
   * Creates an instance of MessageList.
   * @param {object} props props object
   * @memberof MessageList
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * Renders message list page
   * @returns {JSX} returns message list page
   * @memberof MessageList
   */
  render() {
    let groupsname = '';
    let groupId = '';
    if (this.props.selectedGroup.length !== 0) {
      groupsname = this.props.selectedGroup[0].groupname;
      groupId = this.props.selectedGroup[0].groupId;
    }
    return (
      <div className="bottomMargin">
        <List>
        <Subheader><strong>{groupsname} Message List </strong></Subheader>
        {
            this.props.messages.map((message, i) => <Message userRead = {this.props.userReadMessages}
                  groupId={groupId} message={message} key={i} />)
        }
        </List>
          <p className="error">{this.props.errors}</p>
      </div>
    );
  }
}

export default MessageList;
