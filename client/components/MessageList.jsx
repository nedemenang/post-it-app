import React, { Component } from 'react';
import { List, Subheader } from 'material-ui';
import lodash from 'lodash';
import '../public/style.scss';
import Message from './Message';

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
    if (!lodash.isEmpty(this.props.selectedGroup)) {
      groupsname = this.props.selectedGroup.groupName;
      groupId = this.props.selectedGroup.groupId;
    }
    return (
      <div className="bottomMargin">
        <List>
        <Subheader><strong>{groupsname} Message List </strong></Subheader>
        {
            this.props.messages.map((message, i) =>
            <Message userRead = {this.props.userReadMessages}
                  groupId={groupId} message={message} key={i} />)
        }
        </List>
      </div>
    );
  }
}

export default MessageList;
