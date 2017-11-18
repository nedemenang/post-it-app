import React, { Component } from 'react';
import { List, Subheader } from 'material-ui';
import lodash from 'lodash';
import toastr from 'toastr';
import { getUsersNotInGroups } from '../utils/appAPI';
import '../public/style.scss';
import User from './User';

require('underscore-query')(lodash);


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
    this.handleUserSearchChange = this.handleUserSearchChange.bind(this);
    this.state = {
      searchedArray: [],
      searchParameter: ''
    };
  }

  /**
   *
   *
   * @memberof UserList
   */
  handleUserSearchChange(event) {
    if (!lodash.isEmpty(this.props.selectedGroup)) {
      this.setState({ searchedArray:
        getUsersNotInGroups(this.props.selectedGroup) });
      this.setState({ searchParameter: event.target.value });
      this.setState({ searchedArray: lodash.query(this.props.users,
      { userName: { $like: this.state.searchParameter } }) });
    } else {
      toastr.error('Please select a group!');
    }
  }

  /**
   *
   * Renders user list page
   * @returns {JSX} returns userlist page
   * @memberof UserList
   */
  render() {
    let groupsName = '';
    if (!lodash.isEmpty(this.props.selectedGroup)) {
      groupsName = this.props.selectedGroup.groupName;
    }
    return (
      <div>
         <input
              onChange={this.handleUserSearchChange}
              type="text" className="form-control"
              value={this.state.searchParameter}
              placeholder="Search for Users" />
        <List>
        <Subheader><strong>Click to add user to group</strong></Subheader>
          {
            this.state.searchedArray.map((user, i) => <User
            selectedGroup={this.props.selectedGroup}
            user={user} key={i} />)
          }
          </List>
      </div>
    );
  }
}

export default UserList;
