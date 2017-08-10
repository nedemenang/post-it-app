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
import AppStore from '../stores/AppStore';
import AppAPI from '../utils/appAPI';
import Icon from 'react-icons-kit';
import { bubble } from 'react-icons-kit/icomoon/bubble';       

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



class Group extends Component {

groupClicked() {

    const user = this.props.loggedInUser

    const userGroup = {
      groupId: this.props.group.groupId,
      userId: user[0].id 
    }

    AppActions.selectGroup(this.props.group);
    AppAPI.getGroupMessages(userGroup);
    AppAPI.getUsersNotInGroups(this.props.group);

    const updateObject = {
      groupId : this.props.group.groupId,
      email: user[0].email,
      userId: user[0].id
    }

    AppActions.updateMessageFlags(updateObject);
    //console.log(this.props.selectedGroup);
  }
  
  constructor(props){
    super(props);
    this.groupClicked = this.groupClicked.bind(this);
    this.state= {};
  }
  render(){
    let newM = '';
    if(this.props.group.newMessage === true){
       newM = <Icon icon={bubble} />
    }
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <ListItem onTouchTap={this.groupClicked}>
          <strong>{this.props.group.groupname} {newM}</strong>
        </ListItem>
      </MuiThemeProvider>
    );
  }
}

export default Group;