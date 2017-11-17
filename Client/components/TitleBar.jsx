import React, { Component } from 'react';
import '../public/style.scss';
import $ from 'jquery';
import { AppBar } from 'material-ui';
import { Link } from 'react-router-dom';
import { signOutUser } from '../actions/AppActions';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const style = { margin: 5 };

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
  <MenuItem
            primaryText="home"
            containerElement={<Link to="/#" />}
          />
          <MenuItem
            primaryText="Edit Profile"
            containerElement={<Link to="/ProfileEdit" />}
          />
          <MenuItem
            primaryText="Sign Out"
            containerElement={<Link to="/" />}
            onTouchTap={signOut}
          />
  </IconMenu>
);

/**
 * @class TitleBar
 * @extends {Component}
 */
class TitleBar extends Component {
  handleToggle() {
    // alert('Stone cold');
    $('.leftColumn').toggle();
  }
  /**
   *
   * Renders title bar page
   * @returns {JSX} returns title bar page
   * @memberof TitleBar
   */
  render() {
    return (
      <div className="topnav">
          <AppBar onLeftIconButtonTouchTap = {this.handleToggle.bind(this)} title={<ListItem leftAvatar={
        <Avatar
          src={JSON.parse(localStorage.getItem('user')) !== null
          ? JSON.parse(localStorage.getItem('user')).profilePic : ''}
          size={30}
          style={style}
           />
      }>
         <strong>{JSON.parse(localStorage.getItem('user')) !== null
         ? JSON.parse(localStorage.getItem('user')).displayName : ''}</strong>
     </ListItem>} iconElementRight={< Menu />} />
      </div>
    );
  }


}

export default TitleBar;
