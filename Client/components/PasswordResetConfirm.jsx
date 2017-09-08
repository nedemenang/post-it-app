import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery.js';
import { receiveErrors, confirmPasswordReset } from '../actions/AppActions';
import QueryString from 'query-string';


/**
 * Redirects to home page after resetting password
 * @return {void} returns void
 */
function redirectToHome() {
  setTimeout(() => {
    window.location.href = '/#';
  }, 2000); // will call the function after 2 secs.
}

/**
 * @class PasswordResetConfirm
 * @extends {Component}
 */
class PasswordResetConfirm extends Component {

/**
 * Calls the confirm password reset function
 * @return {void} return void
 * @param {object} event event object
 * @memberof PasswordResetConfirm
 */
  reset(event) {
  //
    event.preventDefault();
    const password = this.refs.password.value.trim();
    const confirmPassword = this.refs.confirmPassword.value.trim();

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
   * Creates an instance of PasswordResetConfirm.
   * @param {object} props props object
   * @memberof PasswordResetConfirm
   */
  constructor(props) {
    super(props);

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
</div>
    );
  }

}

export default PasswordResetConfirm;
