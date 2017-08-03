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
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class ProfileEdit extends Component {
  
save(event){
  event.preventDefault();
  let user = {
    username: this.refs.username.value.trim(),
    phoneNo: this.refs.phoneNo.value.trim(),
    profilePic: this.state.file
  }
    AppActions.updateUserProfile(user);
    this.refs.username.value === '';
    this.refs.phoneNo.value === '';
}



  constructor(props){
    super(props);
    this.state = {
      file: ''
    };
    this.save = this.save.bind(this);
    
  }
  render(){
    return(
   <div>
     <div className="form">
    <form className="login-form">
    <h3>Profile Edit</h3>
      <input type="text" ref="username" placeholder="username"/>
      <input type="text" ref="phoneNo" placeholder="Phone number (+2348012345678)"/>
      <ImagesUploader
                url="http://localhost:3000/notmultiple"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(error, response) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log(response);
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