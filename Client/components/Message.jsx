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


class Message extends Component {

  constructor(props){
    super(props);
    this.state= {
    };
  }
  render(){
    //console.log(this.props.message);
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <ListItem leftAvatar={
        <Avatar
          src={this.props.message.userProfilePic}
          size={30}
          style={style}
        />
      }>
          <strong>{this.props.message.messageBody}</strong><br/>
          <p><small>{this.props.message.postedBy} - {this.props.message.postedon}</small></p>
        </ListItem>
      </MuiThemeProvider>
    );
  }
}

export default Message;