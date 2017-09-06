import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

class passwordReset extends Component {

/**
 * Calls reset password action
 * @param {object} event event object
 * @return {void} password reset page
 */
reset(event){
  // 
  event.preventDefault();
  const email = this.refs.resetEmail.value.trim();
  if(this.refs.resetEmail.value === ''){
    AppActions.receiveErrors('Please insert email');
  } else{
    AppActions.resetPassword(email); 
  }
}

  constructor(props){
    super(props);

    this.reset = this.reset.bind(this);
  }
  /**
   * Renders password reset page
  * @return {JSX} password reset page
  */
  render(){
    return(
  <div className="login-page">
      <div className="form">
    <form className="login-form">
    <h3>Reset Password</h3>
      <input type="text" ref="resetEmail" placeholder="email"/>
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.reset}>Send Email</button>
            <br/>
       <br/>
    </form>
    
  </div>
</div>
    );
  }

}

export default passwordReset;