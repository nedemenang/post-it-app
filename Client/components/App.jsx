import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageBoard from './MessageBoard';
import '../public/style.css';
//import UserList from './UserList';
//import GroupList from './GroupList';
//import MessageList from './MessageList'; 
class App extends Component {

getAppState(){
    return {

    }
}
  getInitialState(){
      return getAppState();
  }

  componentDidMount(){
    AppStore.addChangeListener(this._onChange);
  }

componentUnmount() {
  AppStore.removeChangeListener(this._onChange);
}

  constructor(props){
    super(props);
    this.state  = {
    }

  }
   render() {
      return (
         <div>
            <MessageBoard />
         </div>
      );
   }

   _onchange() {
     this.setState(getAppState());
   }
  
}

export default App;
