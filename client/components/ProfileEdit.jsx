import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import '../public/style.scss';
import TitleBar from './TitleBar';
import History from '../utils/history';
import { updateUserProfile } from '../actions/AppActions';

/**
 * @class ProfileEdit
 *
 * @extends {Component}
 */
class ProfileEdit extends Component {

/**
 * Call update user profile action
 *
 * @param {object} event event object
 *
 * @memberof ProfileEdit
 */

 /**
   * Set username state when user types
   *
   * @param {object} event event object
   *
   * @memberof ProfileEdit
   *
   * @returns {void} returns void
   */
  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }


  /**
   * Set phone number state when user selection changes
   *
   * @param {object} event event object
   *
   * @memberof MessageForm
   *
   * @returns {void} returns void
   */
  handlePhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }


  /**
   * Saves the user information on click of button
   *
   * @param {object} event event object
   *
   * @memberof ProfileEdit
   *
   * @return {void} returns void
   */
  save(event) {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      phoneNo: this.state.phoneNumber,
      profilePic: this.state.file
    };
    updateUserProfile(user);
    this.setState({
      userName: '',
      phoneNumber: ''
    });
    setTimeout(() => {
      History.push('/');
    }, 2000);
  }


  /**
   * Creates an instance of ProfileEdit.
   *
   * @param {object} props props object
   *
   * @memberof ProfileEdit
   */
  constructor(props) {
    super(props);
    const str = location.href;
    const str2 = str.replace('#', ' ');
    this.state = {
      file: '',
      path: str2,
      userName: '',
      phoneNumber: ''
    };
    this.save = this.save.bind(this);
  }

  /**
   * Renders profile edit page
   *
   * @returns {JSX} profile edit page
   *
   * @memberof ProfileEdit
   */
  render() {
    return (
   <div>
     <TitleBar />
     <div className="form">
    <form className="login-form">
    <h3 style={{ marginTop: 40 }}>Profile Edit</h3>
      <input type="text"
      value={this.state.userName}
      id="userName"
      placeholder="username"
      onChange={ this.handleUserNameChange.bind(this) }/>
      <input type="text"
      id="phoneNumber"
      value={this.state.phoneNumber}
      placeholder="Phone number (+2348012345678)"
      onChange={ this.handlePhoneNumberChange.bind(this) }
      />
      <ImagesUploader
                url={`${this.state.path}/profilePictures`}
                optimisticPreviews
                multiple={false}
                onLoadEnd={(error, response) => {
                  this.setState({
                    file: response,
                  });
                }}
                label="Upload a profile picture"
                />
      <button className="button" onClick={this.save}>Save</button>
    </form>
  </div>
</div>
    );
  }

}

export default ProfileEdit;
