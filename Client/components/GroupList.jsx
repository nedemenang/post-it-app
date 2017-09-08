import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import io from 'socket.io-client';
import { receiveGroupMessages } from '../actions/AppActions';
import Group from './Group';
import { List, Subheader } from 'material-ui';
import AppStore from '../stores/AppStore';

/**
 *
 * @returns {void} return void
 */
function getAppState() {
  return {
    errors: AppStore.getErrors(),
    success: AppStore.getSuccess(),
    loggedInUser: AppStore.getLoggedInUser(),
    registeredUser: AppStore.getRegisteredUser(),
    users: AppStore.getUsersNotInGroup(),
    groups: AppStore.getUserGroups(),
    messages: AppStore.getGroupMessages(),
    selectedGroup: AppStore.getSelectedGroup(),
    userReadMessages: AppStore.getUsersReadMessage()
  };
}


/**
 * @class GroupList
 * @extends {Component}
 */
class GroupList extends Component {

  connect() {
  }

  /**
   *
   * @return {void} return void
   * @memberof GroupList
   */
  componentDidMount() {
    this.socket = io('http://postitappnnam.herokuapp.com');
    this.socket.on('connect', this.connect.bind(this));

    this.socket.on('messageAdded', (groupsMessages) => {
      const user = localStorage.getItem('user');
      if (this.props.selectedGroup[0] !== undefined) {
        if (this.props.selectedGroup[0].groupId ===
          groupsMessages.groupId && JSON.parse(user).id === groupsMessages.userId) {
          receiveGroupMessages(groupsMessages.groupMessages);
        }
      }
    });
    AppStore.addChangeListener(this.onChange.bind(this));
  }

  /**
   *
   * @return {void} return void
   * @memberof GroupList
   */
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange.bind(this));
  }

  /**
   *
   * @return {void} return void
   * @memberof GroupList
   */
  handleToggle() {
    $('.group-form').slideToggle();
    // this.props.errors = '';
  }

  /**
   * Creates an instance of GroupList.
   * @param {props} props props object
   * @memberof GroupList
   */
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
   // this.groupClicked = this.groupClicked.bind(this);
    this.state = {};
  }

  /**
   *
   * @return {return} return void
   * @memberof GroupList
   */
  onChange() {
    this.setState(getAppState());
  }

  /**
   *
   * Renders jsx components
   * @returns {JSX} return group list page
   * @memberof GroupList
   */
  render() {
    return (
      <div className="bottomMargin">
        <div>
        <List>
        <Subheader><strong>Group List</strong></Subheader>
          {
            this.props.groups.map((group, i) => <Group loggedInUser =
            {this.props.loggedInUser} group={group} key={i} />)
          }
          </List>
          <button className="button" onClick={this.handleToggle}>
            Create New Group</button>
          </div>
      </div>

    );
  }

}

export default GroupList;
