import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import io from 'socket.io-client';
import lodash from 'lodash';
import Snackbar from 'material-ui/Snackbar';

/**
 * @class notification
 * @extends {Component}
 */
class notification extends Component {

  /**
   * Adds a sockect listener when component is mounted
   * @return {void} return void
   * @memberof notification
   */
  componentDidMount() {
    this.socket = io(`${__dirname}`);
    this.socket.on('connect', ()=>{});

    this.socket.on('messageBroadcast', (subscribers) => {
      const user = localStorage.getItem('user');
      if (JSON.parse(user).email !== subscribers.postedBy) {
        if (lodash.indexOf(subscribers.subscribers, String(JSON.parse(user).id), true) !== -1) {
          this.setState({
            notifiedGroup: subscribers.groupName,
            open: true,
          });
        }
      }
    });
  }


  /**
   * Creates an instance of notification.
   * @param {object} props props object
   * @memberof notification
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      notifiedGroup: ''
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  /**
   *
   * Sets open and notified group state
   * @memberof notification
   */
  handleRequestClose() {
    this.setState({
      open: false,
      notifiedGroup: ''
    });
  }

  /**
   *
   * Renders notification page
   * @returns {JSX} Returns notification page
   * @memberof notification
   */
  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message = {`Message added in group ${this.state.notifiedGroup}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>

    );
  }
}

export default notification;
