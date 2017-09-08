import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import '../public/style.css';
import $ from '../public/jquery.js';
import { updateUserProfile } from '../actions/AppActions';

/**
 * @class ProfileEdit
 * @extends {Component}
 */
class ProfileEdit extends Component {

/**
 *
 * Call update user profile action
 * @param {object} event event object
 * @memberof ProfileEdit
 */
  save(event) {
    event.preventDefault();
    const user = {
      username: this.refs.username.value.trim(),
      phoneNo: this.refs.phoneNo.value.trim(),
      profilePic: this.state.file
    };
    updateUserProfile(user);
    this.refs.username.value === '';
    this.refs.phoneNo.value === '';
  }


  /**
   * Creates an instance of ProfileEdit.
   * @param {object} props props object
   * @memberof ProfileEdit
   */
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
    this.save = this.save.bind(this);
  }

  /**
   * Renders profile edit page
   * @returns {JSX} profile edit page
   * @memberof ProfileEdit
   */
  render() {
    return (
   <div>
     <TitleBar />
     <div className="form">
    <form className="login-form">
    <h3 style={{ marginTop: 40 }}>Profile Edit</h3>
      <input type="text" ref="username" placeholder="username"/>
      <input type="text" ref="phoneNo" placeholder="Phone number (+2348012345678)"/>
      <ImagesUploader
                url="http://postitappnnam.herokuapp.com/notmultiple"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(error, response) => {
                  this.setState({
                    file: response,
                  });
                }}
                label="Upload a profile picture"
                />
      <p className="success">{this.props.success}</p>
      <p className="error">{this.props.errors}</p>
      <button className="button" onClick={this.save}>Save</button>
    </form>
  </div>
</div>
    );
  }

}

export default ProfileEdit;
