import React, { Component } from 'react';
import '../public/style.css';
import $ from '../public/jquery';
import { createGroup } from '../actions/AppActions';


/**
 * @class GroupForm
 * @extends {Component}
 */
class GroupForm extends Component {

  /**
   * Creates group
   * @param {object} event event object
  * @return {void} return void
  */
  submit(event) {
    event.preventDefault();

    const groupname = this.refs.group.value.trim();
    const dateCreated = (new Date()).toLocaleString('en-GB');

    const user = localStorage.getItem('user');

    if (this.refs.group.value !== '') {
      const group = {
        groupname,
        datecreated: dateCreated,
        createdBy: JSON.parse(user).email,
        createdByDisplayName: JSON.parse(user).displayName,
        createdByProfilePic: JSON.parse(user).profilePic,
        createdByUserId: JSON.parse(user).id
      };
      createGroup(group);
      this.refs.group.value = '';
      $('.group-form').slideToggle();
    }
  }

  /**
   * Creates an instance of GroupForm.
   * @param {object} props props object
   * @memberof GroupForm
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }
  /**
   * @returns {JSX} returns group form page
   * @memberof GroupForm
   */
  render() {
    return (
      <div className="bottomMargin">
         <form onSubmit={this.submit} className= "group-form">
              <input type="text" className="form-control"
              ref="group" placeholder="Press enter to submit" />
              <p>{this.props.errors}</p>
         </form>
      </div>
    );
  }
}

export default GroupForm;
