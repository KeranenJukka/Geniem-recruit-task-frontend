import React from 'react';
import {connect} from 'react-redux';

import './login.css';

import { Link } from 'react-router-dom';


const axios = require('axios');


class Login extends React.Component {

    constructor(props) {
        
        super();
    
        this.info = {
            username: "",
            password: ""
        }

    }

loginInfo = (e) => {

    var info = {...this.info}

    switch (e.target.id) {

        case "username":
        info.username = e.target.value;
        break;

        case "password":
        info.password = e.target.value;
        break;

        default:
            break;
       
    }

    this.info = info;

}

sendInfo = () => {

    var info = {...this.info}

    
    axios.post('http://localhost:8080/login', info)
    .then(response => {

        console.log(response)

        if (response.data === "no" || response.data === false) {
            
            document.getElementById("wrong").style.visibility = "visible";

        }

        else if (response.data.res === "success") {

            var token = response.data.token;
            var user = response.data.user;

            this.props.changeToken(token, user);

            this.props.history.push('/theapp');

        }

        


    })

}


render () {

return (

    <div id="loginwrap">


        <div className="loginwrap2">
        <div id="logincont">
        
        
        <h1 className="thetitle">To Do Web App</h1>

        <div className="form" id="logininfo">

        <p className="info">Username</p>
        <input onChange={this.loginInfo} id="username" type="text"></input>
        <p className="info">Password</p>
        <input onChange={this.loginInfo} id="password" type="text"></input>

        <div onClick={this.sendInfo} className="buttoncont" id="loginbutcont">
        <div className="button" id="loginbutton"><p>LOGIN</p></div>
        </div>

        <div id="createcont">
        <Link id="loginaccount" to="/createaccount">Create Account</Link>
        </div>

        <p id="wrong">Wrong username or password!</p>
        
        </div>
        </div>
        </div>

    </div>

)



}


}

function mapDispatchToProps (dispatch) {
  
    return {
      changeToken: function (token, user) {dispatch({
          type: "changetoken",
          token: token,
          user: user
      })}
      
    }
    
  }
  
  export default connect(null, mapDispatchToProps)(Login);