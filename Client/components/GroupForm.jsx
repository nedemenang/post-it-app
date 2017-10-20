import React, { Component } from 'react';
import $ from 'jquery';
import '../public/style.css';
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

    const groupname = this.state.groupname.trim();
    const dateCreated = (new Date()).toLocaleString('en-GB');
    const user = localStorage.getItem('user');
    if (this.state.groupname !== '') {
      const group = {
        groupname,
        datecreated: dateCreated,
        createdBy: JSON.parse(user).email,
        createdByDisplayName: JSON.parse(user).displayName,
        createdByProfilePic: JSON.parse(user).profilePic,
        createdByUserId: JSON.parse(user).id
      };
      createGroup(group);
      this.setState({
        groupname: ''
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
    this.setState({ groupname: event.target.value });
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
      groupname: ''
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
              value={this.state.groupname}
              placeholder="Press enter to submit" />
              <p>{this.props.errors}</p>
         </form>
      </div>
    );
  }
}

export default GroupForm;
