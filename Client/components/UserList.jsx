import React, { Component } from 'react';
import { List, Subheader } from 'material-ui';
import lodash from 'lodash';
import '../public/style.scss';
import User from './User';


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
    if (!lodash.isEmpty(this.props.selectedGroup)) {
      groupsname = this.props.selectedGroup.groupname;
    }
    return (
      <div>
        <List>
        <Subheader><strong>Click to add user to group</strong></Subheader>
          {
            this.props.users.map((user, i) => <User
            selectedGroup={this.props.selectedGroup}
            user={user} key={i} />)
          }
          </List>
      </div>
    );
  }
}

export default UserList;
