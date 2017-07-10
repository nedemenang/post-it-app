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

class Login extends Component {
  
login(event){
  // 
  event.preventDefault();
  const email = this.refs.loginEmail.value.trim();
  const password = this.refs.loginPassword.value.trim();
  
  let user = {
    email : email,
    password: password,
    isAuthenticated: false,
    profilePic: ''
  }

  if(this.refs.loginEmail.value === ''){
    AppActions.receiveErrors('Please insert email');
  }else if (this.refs.loginPassword.value === '')
  {
    AppActions.receiveErrors('Please insert password');
  } else{
    AppActions.login(user); 
  }
}

handleToggle(){
    $('form').slideToggle();
    AppActions.receiveErrors('');
    this.refs.email.value = '';
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.loginEmail.value = '';
    this.refs.loginPassword.value = '';
  };

signup(event){
  event.preventDefault();
  let user = {
    email : this.refs.email.value.trim(),
    password: this.refs.password.value.trim(),
    username: this.refs.username.value.trim()
  }
  

  if(this.refs.email.value === ''){
    AppActions.receiveErrors('Please insert email');
  }else if (this.refs.password.value === '')
  {
    AppActions.receiveErrors('Please insert password');
  }else if (this.refs.username.value === ''){
    AppActions.receiveErrors('Please insert username');
  } 
  else{
    AppActions.registerUser(user);
    this.refs.email.value === '';
    this.refs.username.value === '';
    this.refs.password.value === '';
  }
}

onSignIn(googleUser){
  console.log('im in on sign in method');
  const id_token = googleUser.getAuthResponse().id_token
  AppActions.registerGoogleUser(id_token);
   
}


renderGoogleLoginButton() {
    console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 293,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    })
  }

  componentDidMount() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  }

  constructor(props){
    super(props);
    //this.state =;

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }
  render(){
    //console.log(this.props.errors)
    return(
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
    </form>
    <form className="register-form">
    <h3>REGISTER</h3>
      <input type="text" ref="email" placeholder="email address"/>
      <input type="password" ref="password" placeholder="password"/>
      <input type="text" ref="username" placeholder="username"/>
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.signup}>Register</button>
      <p className="message">Already registered? <a onClick={this.handleToggle} href="#">Sign In</a></p>
    </form>
  </div>
</div>
    );
  }

}

export default Login;