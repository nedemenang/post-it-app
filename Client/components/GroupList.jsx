import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import Group from './Group';
import {List, Card, Subheader} from 'material-ui';
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
  //userAgent: req.headers['user-agent'],
});


class GroupList extends Component {

  handleToggle(){
    $('.group-form').slideToggle();
    //this.props.errors = '';
  };

 // groupClicked() {
   // console.log('click me jooorr')
 // }

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
                  return <Group group={group} key={i} />
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