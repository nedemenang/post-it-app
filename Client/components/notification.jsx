import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import io from 'socket.io-client';
import _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';
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

class notification extends Component {

  connect(){
    //console.log(`Connected: ${this.socket.io}`);
  }

  /**
   * Adds a sockect listener when component is mounted
   * @return {void} return void
   * @memberof notification
   */
  componentDidMount(){

      this.socket = io('http://localhost:3000');
      this.socket.on('connect', this.connect.bind(this));
 
      this.socket.on('messageBroadcast', (subscribers) => {
      const user = localStorage.getItem('user');
      if(JSON.parse(user).email !== subscribers.postedBy) {
       if(_.indexOf(subscribers.subscribers , String(JSON.parse(user).id ), true) !== -1){
         console.log('We make the party turn up!!')
            this.setState({
                notifiedGroup: subscribers.groupName,
                open: true,
            });
        }
      }
    });
  }


  /**
   * Creates an instance of notification.
   * @param {object} props props object
   * @memberof notification
   */
  constructor(props){
    super(props);

    this.state = {
      open: false,
      notifiedGroup: ''
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  /**
   * 
   * Sets open and notified group state
   * @memberof notification
   */
  handleRequestClose(){
    this.setState({
      open: false,
      notifiedGroup: ''
    });
  };

  /**
   * 
   * Renders notification page
   * @returns {JSX} Returns notification page
   * @memberof notification
   */
  render(){
    return(
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
        <Snackbar
          open={this.state.open}
          message = {`Message added in group ${this.state.notifiedGroup}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </MuiThemeProvider>
      </div>
      
    );
  }
}

export default notification;