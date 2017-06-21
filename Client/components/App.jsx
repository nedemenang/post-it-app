import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageBoard from './MessageBoard';
import '../public/style.css';
//import UserList from './UserList';
//import GroupList from './GroupList';
//import MessageList from './MessageList'; 

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser()
    };
}

class App extends Component {

  getInitialState(){
      return getAppState();
  }

  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this));
  }

componentUnmount() {
  AppStore.removeChangeListener(this._onChange.bind(this));
}

  constructor(props){
    super(props);
    this.state = getAppState();

  }
   render() {
     //console.log(this.state.errors)
     //<Login errors = {this.state.errors} />
      return (
         <div>
            <MessageBoard />
         </div>
      );
   }

 _onChange() {
     this.setState(getAppState());
   };
  
}

export default App;
