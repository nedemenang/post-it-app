import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import io from 'socket.io-client';
import '../public/style.css';
import $ from '../public/jquery.js';
import {AppBar, FlatButton} from 'material-ui'
import AppActions from '../actions/AppActions';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {green100, green500, green700} from 'material-ui/styles/colors';

const style = {margin: 5};
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
});

const Menu = () => (
  
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Home" onTouchTap = {redirectToMessages} />
    <MenuItem primaryText="Edit Profile" onTouchTap = {redirectToEdit} />
    <MenuItem primaryText="Sign out" onTouchTap={signOut} />
  </IconMenu>
);

function redirectToEdit() {
  location.href = '/ProfileEdit';
}

function redirectToMessages() {
  location.href = '/#';
}

function signOut()  {
  AppActions.signOutUser();
  localStorage.removeItem('user');
}

class TitleBar extends Component {

  constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Post It App" iconElementRight={< Menu />} />
            </MuiThemeProvider>
      </div>
    );
  }


}

export default TitleBar;