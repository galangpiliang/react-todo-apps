import React from 'react';
import './App.scss';
import SignUp from './components/auths/SignUp';
import SignIn from './components/auths/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Switch>
            <Route path='/signup' component={SignUp}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/' component={Dashboard}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
