import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import {ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';


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
  //userAgent: req.headers['user-agent'],
});


class User extends Component {
  
  userClicked() {

   if (confirm("Are you sure you want to add this user to group?") == true) {
     console.log(this.props.selectedGroup[0].groupId)
    if(this.props.selectedGroup[0].groupId !== undefined) {
        let userObject = {
        email : this.props.user.email,
        userId: this.props.user.id,
        username: this.props.user.username,
        groupId: this.props.selectedGroup[0].groupId,
        groupName: this.props.selectedGroup[0].groupname
      }
    AppActions.addUserToGroup(userObject);
    } 
  }
}

  constructor(props){
    super(props);
    this.state= {};
    this.userClicked = this.userClicked.bind(this);
  }
  render(){
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <ListItem leftAvatar={
        <Avatar
          src={this.props.user.profilePic}
          size={30}
          style={style}
           />
      }   onTouchTap={this.userClicked}>
         <strong>{this.props.user.email} - {this.props.user.username}</strong>
     </ListItem>
      </MuiThemeProvider>
    );
  }
}

export default User;