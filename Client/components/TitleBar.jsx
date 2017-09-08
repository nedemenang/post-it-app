import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import { AppBar } from 'material-ui';
import { signOutUser } from '../actions/AppActions';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/**
 * @return {void} return void
 */
function redirectToEdit() {
  location.href = '/ProfileEdit';
}

/**
 *
 * @return {void} return void
 */
function redirectToMessages() {
  location.href = '/#';
}

/**
 * @return {void} return void
 */
function signOut() {
  signOutUser();
  localStorage.removeItem('user');
}

const Menu = () => (

  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Home" onTouchTap = {redirectToMessages} />
    <MenuItem primaryText="Edit Profile" onTouchTap = {redirectToEdit} />
    <MenuItem primaryText="Sign out" onTouchTap={signOut} />
  </IconMenu>
);

/**
 * @class TitleBar
 * @extends {Component}
 */
class TitleBar extends Component {
  /**
   *
   * Renders title bar page
   * @returns {JSX} returns title bar page
   * @memberof TitleBar
   */
  render() {
    return (
      <div className="topnav">
          <AppBar title="Post It App" iconElementRight={< Menu />} />
      </div>
    );
  }


}

export default TitleBar;
