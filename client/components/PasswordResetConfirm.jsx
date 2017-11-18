import React, { Component } from 'react';
import QueryString from 'query-string';
import '../public/style.scss';
import { receiveErrors, confirmPasswordReset } from '../actions/AppActions';


/**
 * Redirects to home page after resetting password
 *
 * @return {void} returns void
 */
function redirectToHome() {
  setTimeout(() => {
    window.location.href = '/#';
  }, 2000); // will call the function after 2 secs.
}

/**
 * @class PasswordResetConfirm
 *
 * @extends {Component}
 */
class PasswordResetConfirm extends Component {

/**
 * Calls the confirm password reset function
 *
 * @return {void} return void
 *
 * @param {object} event event object
 *
 * @memberof PasswordResetConfirm
 */
  reset(event) {
  //
    event.preventDefault();
    const password = this.state.password.trim();
    const confirmPassword = this.state.confirmPassword.trim();

    if (password === '') {
      receiveErrors('Please insert password');
    } else if (confirmPassword === '') {
      receiveErrors('Please insert confirmation password');
    } else if (confirmPassword !== password) {
      receiveErrors('Password and confirmation passwords do not match');
    } else {
      const parsed = QueryString.parse(location.search);
      const resetObject = {
        code: parsed.oobCode,
        newPassword: password
      };
      confirmPasswordReset(resetObject);
      redirectToHome();
    }
  }


  /**
   * Function to handle change in password reset field
   *
   * @param {object} event object
   *
   * @memberof PasswordResetConfirm
   */
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  /**
   *Function to handle change in password confirm field
   *
   * @param {object} event object
   *
   * @memberof PasswordResetConfirm
   */
  handleResetPasswordConfirmChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  /**
   * Creates an instance of PasswordResetConfirm.
   * @param {object} props props object
   * @memberof PasswordResetConfirm
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };

    this.reset = this.reset.bind(this);
  }

  /**
   *
   * Renders password reset confirm page
   * @returns {JSX} returns password reset confirm page
   * @memberof PasswordResetConfirm
   */
  render() {
    return (
      <div>
  <div className="login-page">
      <div className="form">
    <form className="login-form">
    <h3>Reset Password</h3>
      <input type="password"
      id="password"
      onChange ={this.handlePasswordChange.bind(this)}
      placeholder="password"/>
      <input type="password"
      id="confirmPassword"
      onChange = {this.handleResetPasswordConfirmChange.bind(this)}
      placeholder="Confirm password"/>
      <button className="button" onClick={this.reset}>Save</button>
            <br/>
       <br/>
    </form>

  </div>
</div>
</div>
    );
  }

}

export default PasswordResetConfirm;
