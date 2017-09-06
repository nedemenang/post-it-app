import React, {Component} from 'react';
import AppActions from '../actions/AppActions';
import '../public/style.css';

class Signup extends Component {

/**
 * 
 * Calls register user action
 * @param {object} event event object
 * @return {void} return void
 * @memberof Signup
 */
signup(event){
  // 
  event.preventDefault();
  let user = {
    email : this.refs.email.value.trim(),
    password: this.refs.password.value.trim(),
    username: this.refs.username.value.trim()
  }

  ///console.log(user);

  AppActions.registerUser(user); 
}

  /**
   * Creates an instance of Signup.
   * @param {props} props props object
   * @memberof Signup
   */
  constructor(props){
    super(props);
    this.state= {};
    this.signup = this.signup.bind(this);
  }

  /**
   * 
   * Renders signup page
   * @returns {JSX} return signup page
   * @memberof Signup
   */
  render(){
    return(
<div className="login-page">
  <div className="form">
    <form className="register-form">
      <input type="text" ref="email" placeholder="email address"/>
      <input type="password" ref="password" placeholder="password"/>
      <input type="text" ref="username" placeholder="username"/>
      <button onClick={this.signup}>Sign</button>
      <p className="message">Already registered? <a href="#">Sign In</a></p>
    </form>
  </div>
</div>
    );
  }
}

export default Signup;