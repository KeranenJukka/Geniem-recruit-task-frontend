import React from 'react';
import {connect} from 'react-redux';

import './createaccount.css';

import { Link } from 'react-router-dom';

const axios = require('axios');

class CreateAccount extends React.Component {

    constructor(props) {
        
        super();
    
        this.state = {

          username: "Username",
          firstname: "First Name",
          password: "Password"

        }

        this.info = {
            username: "",
            firstname: "",
            lastname: "",
            password: "",
        }

      
    }

send = () => {

    if (this.info.username.length === 0) {

      this.setState({
        username: "Pick a username!"
      })

      return null;

    }

    else if (this.info.password.length === 0) {

      this.setState({
        username: "Pick a username!"
      })

      return null;

    }


    axios.post('http://localhost:8080/adduser', this.info)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });


    setTimeout(() => {
  
        axios.get('http://localhost:8080/users')
        .then(function (response) {
          // handle success
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      
      
      }, 1000);

}


change = (e) => {

    

    var info = {...this.info}

    switch (e.target.id) {

        case "username":
        info.username = e.target.value;
        break;

        case "firstname":
        info.firstname = e.target.value;
        break;

        case "lastname":
        info.lastname = e.target.value;
        break;

        case "password":
        info.password = e.target.value;
        break;

        default:
            break;
       
    }

    this.info = info;
    

}

render () {

return (

    <div id="createwrap">

    <div id="createaccountcont">

       <h1 className="thetitle" id="createtitle">Create Account</h1>

        <div className="form" id="createform">
            <p className="info">{this.state.username}</p>
            <input id="username" maxLength="20" onChange={this.change} type="text"></input>

            <p className="info">{this.state.firstname}</p>
            <input id="firstname" maxLength="20" onChange={this.change} type="text"></input>

            <p className="info">Last Name</p>
            <input id="lastname" maxLength="20" onChange={this.change} type="text"></input>

            <p className="info">{this.state.username}</p>
            <input id="password" maxLength="20" onChange={this.change} type="text"></input>

        </div>

        <div className="buttoncont" id="loginbutcont">
        <div onClick={this.send} className="button" id="loginbutton"><p>CREATE</p></div>
        </div>

    </div>


    </div>

)


}


}

export default CreateAccount