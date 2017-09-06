import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import User from './User';
import {List, Card, Subheader} from 'material-ui';
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
  //userAgent: req.headers['user-agent'],
});


class UserList extends Component {

  /**
   * Creates an instance of UserList.
   * @param {object} props prop object
   * @return {void} return void
   * @memberof UserList
   */
  constructor(props){
    super(props);
    this.state= {};
  }

  /**
   * 
   * Renders user list page
   * @returns {JSX} returns userlist page 
   * @memberof UserList
   */
  render(){
    let groupsname = '';
    if (this.props.selectedGroup.length !== 0)
    {
      groupsname = this.props.selectedGroup[0].groupname;
    }
    return(
      <div>
      <MuiThemeProvider muiTheme={muiTheme}>
        <List>
        <Subheader><strong>Click to add user to group</strong></Subheader>
          {
            this.props.users.map((user, i) => {
                  return <User selectedGroup={this.props.selectedGroup} user={user} key={i} />
              })
          }
          </List>
          </MuiThemeProvider>
      </div>
      //button to add to group....
    );
  }
}

export default UserList;