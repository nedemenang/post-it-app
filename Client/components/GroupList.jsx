import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';
import Group from './Group';


class GroupList extends Component {

  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return(
      <div className="well">
          <h3>Groups</h3>
          {
            this.props.groups.map((group, i) => {
                  return <Group group={group} key={i} />
              })
          }
      </div>
    );
  }
}

export default GroupList;