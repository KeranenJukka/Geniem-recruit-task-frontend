import React from 'react';

import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/login';
import CreateAccount from './components/createaccount';
import Theapp from './components/theapp';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     
     <Route exact path='/' component={Login}/>
     <Route exact path='/createaccount' component={CreateAccount}/>
     <Route exact path='/theapp' component={Theapp}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
