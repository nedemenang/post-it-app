import React, { Component } from 'react';
import '../public/style.css';
import { receiveErrors, resetPassword } from '../actions/AppActions';


/**
 * @class passwordReset
 * @extends {Component}
 */
class passwordReset extends Component {

/**
 * Calls reset password action
 * @param {object} event event object
 * @return {void} password reset page
 */
  reset(event) {
    event.preventDefault();
    if (this.state.resetEmail.trim() === '') {
      receiveErrors('Please insert email');
    } else {
      resetPassword(this.state.resetEmail.trim());
    }
  }

  /**
   * Handles email change event
   * @returns {void} returns void
   *
   * @param {object} event object
   *
   * @memberof passwordReset
   */
  handleResetEmailChange(event) {
    this.setState({ resetEmail: event.target.value });
  }

  /**
   * Creates an instance of passwordReset.
   * @param {object} props props object
   * @memberof passwordReset
   * @return {void} return void
   */
  constructor(props) {
    super(props);
    this.state = {
      resetEmail: ''
    };
    this.reset = this.reset.bind(this);
  }
  /**
   * Renders password reset page
  * @return {JSX} password reset page
  */
  render() {
    return (
  <div className="login-page">
      <div className="form">
    <form className="login-form">
    <h3>Reset Password</h3>
      <input type="text" ref="resetEmail"
      onChange = {this.handleResetEmailChange.bind(this)}
      placeholder="email"/>
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
