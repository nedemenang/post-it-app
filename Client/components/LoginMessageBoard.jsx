import React, {Component} from 'react';
import Login from './Login';
import MessageBoard from './MessageBoard';
import AppAPI from '../utils/appAPI';
import AppStore from '../stores/AppStore';

import ls from 'local-storage';

/**
 * 
 * Sets the initial state of the application
 * @returns {void} returns void
 */
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

  /**
   * 
   * Get inital state of the application
   * @returns {void} return void
   * @memberof LoginMessageBoard
   */
  getInitialState(){
      return getAppState();
  }

  

  /**
   * Adds a change event listener to the app store
   * @return {void} return void
   * @memberof LoginMessageBoard
   */
  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this));
  }

  /**
   * Removes a change event listener to the app store
   * @return {void} return void
   * @memberof LoginMessageBoard
   */
  componentUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  
  /**
   * Creates an instance of LoginMessageBoard.
   * @param {object} props props object
   * @memberof LoginMessageBoard
   */
  constructor(props){
    super(props);
    this.state = getAppState();
  }

   /**
    * 
    * Renders the components
    * @returns {JSX} returns login message board page
    * @memberof LoginMessageBoard
    */
   render() {
    
    if (this.state.isAuthenticated == true)
    {
      localStorage.setItem('user',JSON.stringify(this.state.loggedInUser[0]));
      
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

    /**
     * Gets the state of the app
     * @return {void} returns void
     * @memberof LoginMessageBoard
     */
    _onChange() {
     this.setState(getAppState());
   };

  
}

export default LoginMessageBoard;
