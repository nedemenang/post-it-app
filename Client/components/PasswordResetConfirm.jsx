import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import TitleBar from './TitleBar';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import QueryString from 'query-string';
import {green100, green500, green700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const style = {margin: 5};
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
});

/**
 * Redirects to home page after resetting password
 * @return {void} returns void
 */
function redirectToHome() {
  setTimeout(() => {
       window.location.href = "/#"; //will redirect to your blog page (an ex: blog.html)
    }, 2000); //will call the function after 2 secs.
} 




class PasswordResetConfirm extends Component {
  
/**
 * Calls the confirm password reset function
 * @return {void} return void
 * @param {object} event event object
 * @memberof PasswordResetConfirm
 */
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
    AppActions.receiveErrors('Password and confirmation passwords do not match');
  } else {
    const parsed = QueryString.parse(location.search);
    let resetObject = {
      code: parsed.oobCode ,
      newPassword: password
    }
    AppActions.confirmPasswordReset(resetObject);
    redirectToHome();
  }
}


  /**
   * Creates an instance of PasswordResetConfirm.
   * @param {object} props props object 
   * @memberof PasswordResetConfirm
   */
  constructor(props){
    super(props);

    this.reset = this.reset.bind(this);
  }

  /**
   * 
   * Renders password reset confirm page
   * @returns {JSX} returns password reset confirm page
   * @memberof PasswordResetConfirm
   */
  render(){
    return(
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