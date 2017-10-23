import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';
import '../public/style.css';
import { registerUser,
  receiveErrors, login,
  registerGoogleUser } from '../actions/AppActions';

/**
 * @class Login
 *
 * @extends {Component}
 */
class Login extends Component {

/**
 * Login event
 *
 * @param {object} event event object
 *
 * @memberof Login
 *
 * @returns {void} returns void
 */
  login(event) {
  //
    event.preventDefault();
    const email = this.state.loginEmail.trim();
    const password = this.state.loginPassword.trim();

    const user = {
      email,
      password,
      isAuthenticated: false,
      profilePic: ''
    };

    if (this.state.loginEmail.trim() === '') {
      receiveErrors('Please insert email');
    } else if (this.state.loginPassword.trim() === '') {
      receiveErrors('Please insert password');
    } else {
      login(user);
    }
  }

/**
 * Toggles between login and register forms
 *
 * @return {void} return void
 *
 * @memberof Login
 */
  handleToggle() {
    $('form').slideToggle();
    receiveErrors('');
    this.setState({
      email: '',
      username: '',
      password: '',
      loginEmail: '',
      loginPassword: ''
    });
  }

/**
 * Sign function
 * @return {void} return void
 *
 * @param {object} event event object
 *
 * @memberof Login
 */
  signup(event) {
    event.preventDefault();
    const str = location.href;
    const str2 = str.replace('#', '');
    const user = {
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      username: this.state.username.trim(),
      phoneNo: this.state.phoneNumber.trim(),
      profilePic: `${str2}static/files/blank-profile-pic.png`
    };

    if (this.state.email.trim() === '') {
      receiveErrors('Please insert email');
    } else if (this.state.password.trim() === '') {
      receiveErrors('Please insert password');
    } else if (this.state.username.trim() === '') {
      receiveErrors('Please insert username');
    } else {
      registerUser(user);
      this.setState({
        email: '',
        username: '',
        password: '',
        phoneNumber: ''
      });
    }
  }

/**
 * Google sigin
 *
 * @return {void} return void
 *
 * @param {object} googleUser google user object
 *
 * @memberof Login
 */
  onSignIn(googleUser) {
    const idtoken = googleUser.getAuthResponse().id_token;
    registerGoogleUser(idtoken);
  }


/**
 * Renders google login button
 *
 * @return {void} return void
 *
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
  componentWillUnmount() {
    window.removeEventListener('google-loaded', this.renderGoogleLoginButton);
  }


  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handleLoginEmailChange(event) {
    this.setState({ loginEmail: event.target.value });
  }

  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handlePhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  /**
   * @param {event} event event object
   *
   * @memberof Login
   *
   * @returns {void} returns void
   */
  handleLoginPasswordChange(event) {
    this.setState({ loginPassword: event.target.value });
  }
  /**
   * Creates an instance of Login.
   * @param {object} props property object
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      phoneNumber: '',
      loginEmail: '',
      loginPassword: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  /**
   *
   * renders component
   *
   * @returns {JSX} return login page
   *
   * @memberof Login
   */
  render() {
    return (
      <div>
      <div className="login-image">
              </div>
      <div className="login-page">

      <div className="form">
    <form className="login-form">
    <h3>LOG IN</h3>
      <input type="text"
      onChange={this.handleLoginEmailChange.bind(this)}
      value={this.state.loginEmail} ref="loginEmail"
      id="loginEmail"
      placeholder="email"/>
      <input type="password"
      onChange={this.handleLoginPasswordChange.bind(this)}
      id="loginPassword"
      value={this.state.loginpassword} ref="loginPassword" placeholder="password"/>
      <p className="error">{this.props.errors}</p>
      <button id="loginButton" className="button" onClick={this.login}>Log In</button>
            <br/>
       <br/>
      <div id="my-signin2"></div>
      <p className="message">Not registered? <a onClick={this.handleToggle} id="createAccount" href="#">Create an account</a></p>
      <p className="message">Forgot Password? <a href="/PasswordReset">Reset Password</a></p>
    </form>
    <form className="register-form">
    <h3>REGISTER</h3>
      <input type="text"
      onChange={this.handleEmailChange.bind(this)}
      id="email"
      value={this.state.email} ref="email" placeholder="email address"/>
      <input type="password"
      onChange={this.handlePasswordChange.bind(this)}
      id="password"
      value={this.state.password} ref="password" placeholder="password"/>
      <input type="text"
      onChange={this.handleUserNameChange.bind(this)}
      id="username"
      value={this.state.username} ref="username" placeholder="username"/>
      <input type="text"
      onChange={this.handlePhoneNumberChange.bind(this)}
      id="phoneNo"
      value={this.state.phoneNumber} ref="phoneNo" placeholder="Phone number (+2348012345678)"/>
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button id="registerButton" className="button" onClick={this.signup}>Register</button>
      <p className="message">Already registered? <a onClick={this.handleToggle} href="#">Sign In</a></p>
    </form>
  </div>
</div>
</div>
    );
  }

}

export default Login;
