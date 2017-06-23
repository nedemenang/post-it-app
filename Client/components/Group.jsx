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

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <ListItem>
          <strong>{this.props.group.groupname}</strong>
        </ListItem>
      </MuiThemeProvider>
    );
  }
}

export default Group;