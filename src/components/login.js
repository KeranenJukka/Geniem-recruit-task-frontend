import React from 'react';
import {connect} from 'react-redux';

import './login.css';

import { Link } from 'react-router-dom';

class Login extends React.Component {


render () {

return (

    <div id="loginwrap">

        <div id="logincont">
        
        <h1 className="thetitle">To Do Web App</h1>

        <div className="form" id="logininfo">

        <p className="info">Username</p>
        <input type="text"></input>
        <p className="info">Password</p>
        <input type="text"></input>

        <div className="buttoncont" id="loginbutcont">
        <div className="button" id="loginbutton"><p>LOGIN</p></div>
        </div>

        <div id="createcont">
        <Link id="loginaccount" to="/createaccount">Create Account</Link>
        </div>

        <p></p>
        
        </div>

        </div>

    </div>

)



}


}

export default Login