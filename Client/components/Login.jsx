import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import { registerUser,
  receiveErrors, login,
  registerGoogleUser } from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import logo from '../public/images/logo.png';
import profile from '../public/images/blank-profile-pic.png';


/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {

/**
 * Login event
 * @param {object} event event object
 * @memberof Login
 * @returns {void} returns void
 */
  login(event) {
  //
    event.preventDefault();
    const email = this.refs.loginEmail.value.trim();
    const password = this.refs.loginPassword.value.trim();

    const user = {
      email,
      password,
      isAuthenticated: false,
      profilePic: ''
    };

    if (this.refs.loginEmail.value === '') {
      receiveErrors('Please insert email');
    } else if (this.refs.loginPassword.value === '') {
      receiveErrors('Please insert password');
    } else {
      login(user);
    }
  }

/**
 * Toggles between login and register forms
 * @return {void} return void
 * @memberof Login
 */
  handleToggle() {
    $('form').slideToggle();
    receiveErrors('');
    this.refs.email.value = '';
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.loginEmail.value = '';
    this.refs.loginPassword.value = '';
  }

/**
 * Sign function
 * @return {void} return void
 * @param {object} event event object
 * @memberof Login
 */
  signup(event) {
    event.preventDefault();
    const user = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
      username: this.refs.username.value.trim(),
      phoneNo: this.refs.phoneNo.value.trim(),
      profilePic: 'http://postitappnnam.herokuapp.com/static/files/blank-profile-pic.png'
    };


    if (this.refs.email.value === '') {
      receiveErrors('Please insert email');
    } else if (this.refs.password.value === '') {
      receiveErrors('Please insert password');
    } else if (this.refs.username.value === '') {
      receiveErrors('Please insert username');
    } else {
      registerUser(user);
      this.refs.email.value === '';
      this.refs.username.value === '';
      this.refs.password.value === '';
      this.refs.phoneNo.value === '';
    }
  }

/**
 * Google sigin
 * @return {void} return void
 * @param {object} googleUser google user object
 * @memberof Login
 */
  onSignIn(googleUser) {
    const idtoken = googleUser.getAuthResponse().id_token;
    registerGoogleUser(idtoken);
  }


/**
 * Renders google login button
 * @return {void} return void
 * @memberof Login
 */
  renderGoogleLoginButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      width: 293,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn
    });
  }

  /**
   * Adds an event listener after component mounts
   * @return {void} return void
   * @memberof Login
   */
  componentDidMount() {
    window.addEventListener('google-loaded', this.renderGoogleLoginButton);
  }


  /**
   * 
   * @memberof Login
   */
  componentWillMount() {
    window.removeEventListener('google-loaded', this.renderGoogleLoginButton);
  }

  /**
   * Creates an instance of Login.
   * @param {object} props property object
   * @memberof Login
   */
  constructor(props) {
    super(props);
    // this.state =;

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  /**
   *
   * renders component
   * @returns {JSX} return login page
   * @memberof Login
   */
  render() {
    return (
      <div>
      <div className="login-image">
               <img src = {logo} />
              </div>
      <div className="login-page">

      <div className="form">
    <form className="login-form">
    <h3>LOG IN</h3>
      <input type="text" ref="loginEmail" placeholder="email"/>
      <input type="password" ref="loginPassword" placeholder="password"/>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.login}>Log In</button>
            <br/>
       <br/>
      <div id="my-signin2"></div>
      <p className="message">Not registered? <a onClick={this.handleToggle} href="#">Create an account</a></p>
      <p className="message">Forgot Password? <a href="/PasswordReset">Reset Password</a></p>
    </form>
    <form className="register-form">
    <h3>REGISTER</h3>
      <input type="text" ref="email" placeholder="email address"/>
      <input type="password" ref="password" placeholder="password"/>
      <input type="text" ref="username" placeholder="username"/>
      <input type="text" ref="phoneNo" placeholder="Phone number (+2348012345678)"/>
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.signup}>Register</button>
      <p className="message">Already registered? <a onClick={this.handleToggle} href="#">Sign In</a></p>
    </form>
  </div>
</div>
</div>
    );
  }

}

export default Login;
