import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import io from 'socket.io-client';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import GroupList from './GroupList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import GroupForm from './GroupForm';
import AppAPI from '../utils/appAPI';
import AppStore from '../stores/AppStore';
import {Snackbar} from 'material-ui';
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
});

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser(),
      users: AppStore.getUsersNotInGroup(),
      groups: AppStore.getUserGroups(),
      messages: AppStore.getGroupMessages(),
      selectedGroup: AppStore.getSelectedGroup(),
      notifiedGroup: '',
      open: false
    };
}


class MessageBoard extends Component {

getInitialState(){
      return getAppState();
  }


  connect(){
    //console.log(`Connected: ${this.socket.io}`);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

componentDidMount(){

    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect.bind(this));
    //console.log(this.state.groups);
    this.socket.on('userAddedToGroup', (group) => {
      // if(group.groupId === this.state.selectedGroup.groupId)
      //   {
      //     AppAPI.getUsersNotInGroups(group);
      //   }
      getAppState();
    });

    this.socket.on('messageAdded', (group) => {
       if(group.groupId === this.state.selectedGroup.groupId)
         {
           var newArray = this.state.group.slice(); 
           const message = {
             messageBody: group.messageBody,
             postedBy: group.postedBy,
             postedByDisplayName: group.postedByDisplayName,
             postedon: group.postedon,
             priority: group.priority,
             profilePic: group.profilePic
           }   
           newArray.push(message);   
           this.setState({messages: newArray})
         }
          this.setState({
            open: true,
            notifiedGroup: group.groupname
          });
      console.log('message added');
    });

    this.socket.on('userAdded', () => {
      // if(this.state.selectedGroup.groupId !== '' )
      //   {
      //     console.log('user added...')
      //     AppAPI.getUsersNotInGroups(this.state.selectedGroup);
      //   }
      getAppState();
    });

    this.socket.on('groupCreated', (group) => {
      console.log('group created');
      getAppState();
    });

    AppAPI.getUserGroups();
    AppStore.addChangeListener(this._onChange.bind(this));
  }

componentUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  constructor(props){
    super(props);
    //AppActions.receiveUserGroups();
    
    this.state = getAppState();
    //console.log(this.state.loggedInUser);
  }
  render(){
    return(
      <div className="row">
        <div className="leftColumn">
          <GroupList groups = {this.state.groups} />
          <GroupForm />
          <UserList {...this.state} />
        </div>
        <div className="rightColumn">
          <MessageList {...this.state}/>
          <MessageForm {...this.state} />
          </div>
          <div>
             <MuiThemeProvider muiTheme={muiTheme}>
               <Snackbar
                  open={this.state.open}
                  message={"New message added in " + this.state.notifiedGroup}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
              />
               </MuiThemeProvider>
            </div>
      </div>
    );
  }

  _onChange() {
     this.setState(getAppState());
   };

}

export default MessageBoard;