import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';


class Login extends Component {

login(event){
  // 
  const email = this.refs.loginEmail.value.trim();
  const password = this.refs.loginPassword.value.trim();
  
  let user = {
    email : email,
    password: password
  }
  AppActions.login(user); 
}

handleToggle(){
    $('form').slideToggle();
  };

signup(event){
  // 
  event.preventDefault();
  let user = {
    email : this.refs.email.value.trim(),
    password: this.refs.password.value.trim(),
    username: this.refs.username.value.trim()
  }

  AppActions.registerUser(user); 
}

  constructor(props){
    super(props);
    this.state= {};
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  render(){
    return(
      <div className="login-page">
      <div className="form">
    <form className="login-form">
    <h3>LOG IN</h3>
      <input type="text" ref="loginEmail" placeholder="email"/>
      <input type="password" ref="loginPassword" placeholder="password"/>
      <button className="button" onClick={this.login}>Log In</button>
      <p className="message">Not registered? <a onClick={this.handleToggle} href="#">Create an account</a></p>
    </form>
    <form className="register-form">
    <h3>REGISTER</h3>
      <input type="text" ref="email" placeholder="email address"/>
      <input type="password" ref="password" placeholder="password"/>
      <input type="text" ref="username" placeholder="username"/>
      <button className="button" onClick={this.signup}>Register</button>
      <br/>
      <button className="googleButton" onClick={this.signup}>Register with Google</button>
      <p className="message">Already registered? <a onClick={this.handleToggle} href="#">Sign In</a></p>
    </form>
  </div>
</div>
    );
  }
}

export default Login;