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
import {List, Card} from 'material-ui';
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

  constructor(props){
    super(props);
    this.state= {
       groups: [
        'Hi, How are you',
        'Welcome to post it',
        'I am here to make friends'
      ]
    };
  }
  render(){
    return(
      <div className="bottomMargin">
      <MuiThemeProvider muiTheme={muiTheme}>
       <Card>
        <List>
          {
            this.state.groups.map((group, i) => {
                  return <Group group={group} key={i} />
              })
          }
          </List>
       </Card>
          </MuiThemeProvider>
      </div>

    );
  }
}

export default GroupList;