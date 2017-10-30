import React, { Component } from 'react';
import '../public/style.scss';
import { addUserToGroup } from '../actions/AppActions';
import { ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.setState({ open: true });
  }


  /**
   * 
   * 
   * @memberof User
   */
  handleClose() {
    this.setState({ open: false });
  }


  /**
   * 
   * 
   * @memberof User
   */
  handleSave() {
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
    this.setState({ open: false });
  }

  /**
   * Creates an instance of User.
   * @param {object} props props object
   * @memberof User
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.userClicked = this.userClicked.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   *
   * Renders the user page
   * @returns {JSX} returns user page
   * @memberof User
   */
  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSave}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Confirmation"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to add this user?
        </Dialog>

        <ListItem leftAvatar={
        <Avatar
          src={this.props.user.profilePic}
          size={30}
          style={style}
           />
      } onTouchTap={this.userClicked}>
         <strong>{this.props.user.username}</strong>
     </ListItem>
     </div>
    );
  }
}

export default User;
