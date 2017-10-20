import React, { Component } from 'react';
import '../public/style.css';
import { addUserToGroup } from '../actions/AppActions';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const style = { margin: 5 };
/**
 * @class User
 * @extends {Component}
 */
class User extends Component {

  /**
   * Calls the add user to group action
   * @return {void} return void
   * @memberof User
   */
  userClicked() {
    if (confirm('Are you sure you want to add this user to group?') === true) {
      if (this.props.selectedGroup.groupId !== undefined) {
        const userObject = {
          email: this.props.user.email,
          userId: this.props.user.id,
          username: this.props.user.username,
          groupId: this.props.selectedGroup.groupId,
          groupName: this.props.selectedGroup.groupname
        };
        addUserToGroup(userObject);
      }
    }
  }

  /**
   * Creates an instance of User.
   * @param {object} props props object
   * @memberof User
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.userClicked = this.userClicked.bind(this);
  }

  /**
   *
   * Renders the user page
   * @returns {JSX} returns user page
   * @memberof User
   */
  render() {
    return (
        <ListItem leftAvatar={
        <Avatar
          src={this.props.user.profilePic}
          size={30}
          style={style}
           />
      } onTouchTap={this.userClicked}>
         <strong>{this.props.user.username}</strong>
     </ListItem>
    );
  }
}

export default User;
