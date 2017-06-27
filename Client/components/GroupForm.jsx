import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../public/style.css';
import $ from '../public/jquery.js';
import AppActions from '../actions/AppActions';



class GroupForm extends Component {

submit(event){
  event.preventDefault();
  
 // console.log(dateCreated);

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = mm + '/' + dd + '/' + yyyy;

  const groupname = this.refs.group.value.trim();
  const dateCreated = today;

  let group = {
    groupname : groupname,
    datecreated: dateCreated
  }
  
  AppActions.createGroup(group); 
  //this.setState({error : AppStore.getErrors()});
  //console.log(AppStore.getErrors());
  this.refs.group.value = '';
  $('.group-form').slideToggle();
  
}

  constructor(props){
    super(props);
    this.state= {};
    this.submit = this.submit.bind(this);
  }
  render(){
    return(
      <div className="bottomMargin">
         <form onSubmit={this.submit} className= "group-form">
              <input type="text" className="form-control" ref="group" placeholder="Please type group name. Press enter to submit" />
              <p>{this.props.errors}</p>
         </form>
      </div>
    );
  }
}

export default GroupForm;