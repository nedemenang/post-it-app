import React, {Component} from 'react';
import Login from './Login';
import MessageBoard from './MessageBoard';
import AppAPI from '../utils/appAPI';
import AppStore from '../stores/AppStore';

import ls from 'local-storage';

function getAppState() {
    return {
      errors: AppStore.getErrors(),
      success: AppStore.getSuccess(),
      loggedInUser: AppStore.getLoggedInUser(),
      registeredUser: AppStore.getRegisteredUser(),
      isAuthenticated: AppStore.getIsAuthenticated()
    };
}

class LoginMessageBoard extends Component {

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
    
    if (this.state.isAuthenticated == true)
    {
      // console.log(this.state.loggedInUser[0]);
      localStorage.setItem('user',JSON.stringify(this.state.loggedInUser[0]));
      
      // localStorage.setItem('isAuthenticated', JSON.stringify(this.state.isAuthenticated));
    }
     
    let componentToMount; 
    if(localStorage.getItem('user') == null) {
        componentToMount = <Login {...this.state} />
    } else {
      componentToMount = <MessageBoard />
    }

      return (
         <div>
           {componentToMount}
      </div>
      );
   }

    _onChange() {
     this.setState(getAppState());
   };

  
}

export default LoginMessageBoard;
