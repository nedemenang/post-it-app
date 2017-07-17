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
import QueryString from 'query-string';

class PasswordResetConfirm extends Component {
  
reset(event){
  // 
  event.preventDefault();
  const password = this.refs.password.value.trim();
  const confirmPassword = this.refs.confirmPassword.value.trim();

  if(password === ''){
    AppActions.receiveErrors('Please insert password');
  } else if(confirmPassword === ''){
    AppActions.receiveErrors('Please insert confirmation password');
    
  } else if (confirmPassword !== password ){
    const parsed = QueryString.parse(location.search);
    console.log(parsed);
    AppActions.receiveErrors('Password and confirmation passwords do not match');
  } else {
    const parsed = QueryString.parse(location.search);
    console.log(parsed);
    let resetObject = {
      code: parsed.oobCode ,
      newPassword: password
    }
    AppActions.confirmPasswordReset(resetObject); 
  }
}


  constructor(props){
    super(props);

    this.reset = this.reset.bind(this);
  }
  render(){
    return(
  <div className="login-page">
      <div className="form">
    <form className="login-form">
    <h3>Reset Password</h3>
      <input type="password" ref="password" placeholder="password"/>
      <input type="password" ref="confirmPassword" placeholder="Confirm password"/>
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.reset}>Save</button>
            <br/>
       <br/>
    </form>
    
  </div>
</div>
    );
  }

}

export default PasswordResetConfirm;