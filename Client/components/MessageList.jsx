import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import Message from './Message';
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


class MessageList extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }

  /**
   * 
   * Renders message list page
   * @returns {JSX} returns message list page
   * @memberof MessageList
   */
  render(){
    let groupsname = '';
    let groupId = '';
    if (this.props.selectedGroup.length !== 0)
    {
      groupsname = this.props.selectedGroup[0].groupname;
      groupId = this.props.selectedGroup[0].groupId;
    }
    return(
      <div className="bottomMargin">
      <MuiThemeProvider muiTheme={muiTheme}>
        <List>
        <Subheader><strong>{groupsname} Message List </strong></Subheader>
          {
            this.props.messages.map((message, i) => {
                  return <Message userRead = {this.props.userReadMessages} groupId={groupId} message={message} key={i} />
              })
          }
        </List>
          </MuiThemeProvider>
          <p className="error">{this.props.errors}</p>
      </div>
    );
  }
}

export default MessageList;