import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import AppAPI from '../utils/appAPI';
import {ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/icomoon/checkmark';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';       

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


class Message extends Component {

  messageClicked(event) {

    this.setState({
      openPopUp: true,
      anchorEl: event.currentTarget,
    });

    const item = {
      groupId: this.props.groupId,
      messageId: this.props.message.id
    }
    //console.log(item);
    AppAPI.getUsersReadMessage(item);
    //console.log(this.props.userRead);
  }

  handleRequestClose() {
    this.setState({
      openPopUp: false,
    });
  };

  constructor(props){
    super(props);
    this.messageClicked = this.messageClicked.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state= {
      openPopUp: false,
    };
  }
  render(){
    //console.log(this.props.message.profilePic);
    let isRead = '';
    if(this.props.message.isRead === true){
       isRead = <Icon icon={checkmark} />
    }
    
    return(
      <div>
      <MuiThemeProvider muiTheme={muiTheme}>
        <ListItem onTouchTap={this.messageClicked} leftAvatar={
        <Avatar
          src={this.props.message.profilePic}
          size={30}
          style={style}
        />
      }>
          <strong>{this.props.message.messageBody} {isRead}</strong><br/>
          <p><small>{this.props.message.postedBy} - {this.props.message.postedon}</small></p>
        </ListItem>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
        <Popover
          open={this.state.openPopUp}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
          
          {this.props.userRead.map((user, i) =>
            <MenuItem key={i} primaryText={user.email} />
          )}
          </Menu>
        </Popover>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default Message;