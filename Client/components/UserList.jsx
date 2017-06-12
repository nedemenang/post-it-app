import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import User from './User';


class UserList extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <div className="well">
          <h3>Users</h3>
          {
            this.props.users.map((user, i) => {
                  return <User user={user} key={i} />
              })
          }
          
      </div>
      //button to add to group....
    );
  }
}

export default UserList;