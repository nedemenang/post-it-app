import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import io from 'socket.io-client';
import AppActions from '../actions/AppActions';
import Group from './Group';
import {List, Card, Subheader} from 'material-ui';
import AppStore from '../stores/AppStore';
//import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';

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


class GroupList extends Component {

  connect(){
    //console.log(`Connected: ${this.socket.io}`);
  }

  componentDidMount(){

      this.socket = io('http://localhost:3000');
      this.socket.on('connect', this.connect.bind(this));
 
      this.socket.on('messageAdded', (groupsMessages) => {
      if(this.props.selectedGroup[0] !== undefined){
        if(this.props.selectedGroup[0].groupId === groupsMessages.groupId && this.props.loggedInUser[0].id == groupsMessages.userId){
            // console.log(groupsMessages.groupMessages);
            AppActions.receiveGroupMessages(groupsMessages.groupMessages);
          }
        }
      });
  }

  handleToggle(){
    $('.group-form').slideToggle();
    //this.props.errors = '';
  };
  constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
   // this.groupClicked = this.groupClicked.bind(this);
    this.state= {};
  }
  render(){
    //console.log(this.props.groups)
    return(
      <div className="bottomMargin">
      <MuiThemeProvider muiTheme={muiTheme}>
       <Card>
        <List>
        <Subheader><strong>Group List</strong></Subheader>
          {
            this.props.groups.map((group, i) => {
                  return <Group loggedInUser = {this.props.loggedInUser} group={group} key={i} />
              })
          }
          </List>
          <button className="button" onClick={this.handleToggle}>Create New Group</button>
       </Card>
          </MuiThemeProvider>
      </div>

    );
  }
}

export default GroupList;