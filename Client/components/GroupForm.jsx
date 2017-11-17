import React, { Component } from 'react';
import $ from 'jquery';
import '../public/style.scss';
import { createGroup } from '../actions/AppActions';


/**
 * @class GroupForm
 *
 * @extends {Component}
 */
class GroupForm extends Component {

  /**
   * Creates group
   *
   * @param {object} event event object
   *
  * @return {void} return void
  */
  submit(event) {
    event.preventDefault();

    const groupName = this.state.groupName.trim();
    const dateCreated = (new Date()).toLocaleString('en-GB');
    const user = localStorage.getItem('user');
    if (this.state.groupName !== '') {
      const group = {
        groupName,
        dateCreated,
        createdBy: JSON.parse(user).email,
        createdByDisplayName: JSON.parse(user).displayName,
        createdByProfilePic: JSON.parse(user).profilePic,
        createdByUserId: JSON.parse(user).id
      };
      createGroup(group);
      this.setState({
        groupName: ''
      });
      $('.group-form').slideToggle();
    }
  }

  /**
   * Sets groupname state when user types
   *
   * @param {event} event event object
   *
   * @memberof GroupForm
   *
   * @returns {void} returns void
   */
  handleGroupNameChange(event) {
    this.setState({ groupName: event.target.value });
  }

  /**
   * Creates an instance of GroupForm.
   *
   * @param {object} props props object
   *
   * @memberof GroupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: ''
    };
    this.submit = this.submit.bind(this);
  }
  /**
   * @returns {JSX} returns group form page
   *
   * @memberof GroupForm
   */
  render() {
    return (
      <div className="bottomMargin">
         <form onSubmit={this.submit} className= "group-form">
              <input
              onChange={this.handleGroupNameChange.bind(this)}
              type="text" className="form-control"
              value={this.state.groupName}
              placeholder="Press enter to submit" />
         </form>
      </div>
    );
  }
}

export default GroupForm;
