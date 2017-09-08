import React, { Component } from 'react';
import '../public/style.css';
import User from './User';
import { List, Subheader } from 'material-ui';


/**
 * @class UserList
 * @extends {Component}
 */
class UserList extends Component {

  /**
   * Creates an instance of UserList.
   * @param {object} props prop object
   * @return {void} return void
   * @memberof UserList
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * Renders user list page
   * @returns {JSX} returns userlist page
   * @memberof UserList
   */
  render() {
    let groupsname = '';
    if (this.props.selectedGroup.length !== 0) {
      groupsname = this.props.selectedGroup[0].groupname;
    }
    return (
      <div>
        <List>
        <Subheader><strong>Click to add user to group</strong></Subheader>
          {
            this.props.users.map((user, i) => <User selectedGroup={this.props.selectedGroup}
            user={user} key={i} />)
          }
          </List>
      </div>
      // button to add to group....
    );
  }
}

export default UserList;
