import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import { getUserGroups } from '../utils/appAPI';
import GroupList from './GroupList';
import UserList from './UserList';
import MessageList from './MessageList';
import TitleBar from './TitleBar';
import MessageForm from './MessageForm';
import GroupForm from './GroupForm';
import AppStore from '../stores/AppStore';
import { AppBar } from 'material-ui';
import Notification from './notification';
import Drawer from 'material-ui/Drawer';

/**
 * Gets initial state of the app
 * @returns {void} returns void
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
    notifiedGroup: '',
    userReadMessages: AppStore.getUsersReadMessage(),
    open: false
  };
}

/**
 * @class MessageBoard
 *
 * @extends {Component}
 */
class MessageBoard extends Component {

  /**
   * @return {void} return void
   *
   * @memberof MessageBoard
   */
  onChange() {
    this.setState(getAppState());
  }

  /**
   * Sets open state to false
   *
   * @return {void} return void
   *
   * @memberof MessageBoard
   */
  handleRequestClose() {
    this.state.open = false;
  }

/**
 * Set groups user belongs to when component mounts
 * Adds change event listener to app store
 *
 * @return {void} return void
 *
 * @memberof MessageBoard
 */
  componentDidMount() {
    const user = localStorage.getItem('user');
    getUserGroups(JSON.parse(user).id);
    AppStore.addChangeListener(this.onChange.bind(this));
  }

/**
 * Removes change event listener
 *
 * @return {void} return void
 *
 * @memberof MessageBoard
 */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange.bind(this));
  }

  /**
   * Creates an instance of MessageBoard.
   *
   * @param {object} props props object
   *
   * @memberof MessageBoard
   */
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = getAppState();
  }

  /**
   *
   * Returns page components
   *
   * @returns {JSX} return message board page
   *
   * @memberof MessageBoard
   */
  render() {
    return (
      <div>
        <TitleBar />
      <div className="row">
        <div className="leftColumn">
          <Drawer containerStyle={{ height: 'calc(100% - 64px)', top: 64 }}>
          <GroupList selectedGroup= {this.state.selectedGroup}
          groups = {this.state.groups}
          loggedInUser = {this.state.loggedInUser} />
          <GroupForm loggedInUser = {this.state.loggedInUser}/>
          <UserList {...this.state} />
          </Drawer>
        </div>
        <div className="rightColumn">
          <MessageForm {...this.state} />
          <MessageList {...this.state}/>
          <Notification />
          </div>
      </div>
      </div>
    );
  }
}

export default MessageBoard;
