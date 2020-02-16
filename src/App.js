import React from 'react';
import './App.scss';
import SignUp from './components/auths/SignUp';
import SignIn from './components/auths/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path='/signin' exact>
            <SignIn />
          </Route>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
