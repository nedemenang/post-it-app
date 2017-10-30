import React, { Component } from 'react';
import '../public/style.scss';
import { selectGroup } from '../actions/AppActions';
import { ListItem } from 'material-ui/List';
import {getGroupMessages, getQuickGroupMessages,
getUsersNotInGroups } from '../utils/appAPI';
import Icon from 'react-icons-kit';
import { bubble } from 'react-icons-kit/icomoon/bubble';

/**
 * @class Group
 * @extends {Component}
 */
class Group extends Component {

  /**
  * @return {void} return void
  */
  groupClicked() {
    const user = localStorage.getItem('user');

    const userGroup = {
      groupId: this.props.group.groupId,
      userId: JSON.parse(user).id
    };

    selectGroup(this.props.group);
    getGroupMessages(userGroup);
    getQuickGroupMessages(userGroup);
    getUsersNotInGroups(this.props.group);
  }
 /**
  * @param {object} props props object
  * @return {void} return void
  */
  constructor(props) {
    super(props);
    this.groupClicked = this.groupClicked.bind(this);
    this.state = {};
  }
  /**
   * renders components
  * @return {JSX} return group page
  */
  render() {
    let newM = '';
    if (this.props.group.newMessage) {
      newM = <Icon style={{ color: 'red' }} icon={bubble} />;
    }
    return (
      <div >
        <ListItem onTouchTap={this.groupClicked}>
          <strong>{this.props.group.groupname} {newM}</strong>
        </ListItem>
      </div>
    );
  }
}

export default Group;
