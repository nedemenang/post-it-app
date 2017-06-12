import React from 'react';
import { render } from 'react-dom';

import {Route, BrowserRouter, Switch} from 'react-router-dom';
import App from './components/App';
import Signup from './components/Signup';
import AppApI from './utils/AppAPI';

AppApI.getUsers();

render((
     <BrowserRouter>
      <Switch>
          <Route path="/" component={App}/>
          <Route path="/signup" component={Signup} />
        </Switch>
     </BrowserRouter>
     ),
     document.getElementById('app')
);
