import React from 'react';
import {connect} from 'react-redux';

import './createaccount.css';



import { TweenMax } from "gsap";



const axios = require('axios');

var bcrypt = require('bcryptjs');




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


checkName = () => {

  var user = "Username";
  var info = {...this.info}


  if (this.info.username.length === 0) {
    user = "Pick a username!"
    document.getElementById("user").style.color = "red";

    this.setState({
      username: user
    })

    return null

  }


  axios.post('http://localhost:8080/checkuser', info)
  .then(response => {
    
    if (response.data === "found") {

      this.setState({
        username: "This username is reserved!"
      })
      document.getElementById("user").style.color = "red";

      return null
    }
    
    else {

      this.setState({
        username: "Username"
      })

      document.getElementById("user").style.color = "black";

      

    }

  })


}


send = () => {

  
  var first = "First Name"
  var pass = "Password"


    if (this.info.firstname.length === 0 || this.info.password.length < 6) {
      

      if (this.info.firstname.length === 0) {
        first = "Pick a name!"
        document.getElementById("first").style.color = "red";
      }

      else {document.getElementById("first").style.color = "black";}

      if (this.info.password.length < 6) {
        pass = "Pick a password that is at least 6 characters long!"
        document.getElementById("pass").style.color = "red";
      }

      else {document.getElementById("pass").style.color = "black";}

      this.setState({
        firstname: first,
        password: pass
      })

      return null

    }


    this.setState({
      firstname: first,
      password: pass
    })

    
    document.getElementById("first").style.color = "black";
    document.getElementById("pass").style.color = "black";

    var infoSend = {...this.info}



  /* -------Store info--------*/


      axios.post('http://localhost:8080/adduser', infoSend)
    .then( (response) => {
      
      if (response.data.res === "success") {
        
        this.props.changeToken(response.data.token)

       this.props.history.push('/theapp');

      }
      
    })
    .catch(function (error) {
      
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

    <div id="createcont1">

    <div className="createaccountcont">

       <h1 className="thetitle" >Create Account</h1>

        <div className="form">
            <p id="user" className="info">{this.state.username}</p>
            <input id="username" maxLength="20" onChange={this.change} type="text"></input>


        </div>

        <div className="buttoncont">
        <div onClick={this.checkName} className="button" id="loginbutton"><p>CREATE</p></div>
        </div>

    </div>

    </div>


    {/*-------------------------------------------------*/}


    <div id="createcont2">

   <div className="createaccountcont">

       <h1 className="thetitle" >Create Account</h1>

        <div className="form">
           
            <p id="first" className="info">{this.state.firstname}</p>
            <input id="firstname" maxLength="20" onChange={this.change} type="text"></input>

            <p className="info">Last Name</p>
            <input id="lastname" maxLength="20" onChange={this.change} type="text"></input>

            <p id="pass" className="info">{this.state.password}</p>
            <input id="password" maxLength="20" onChange={this.change} type="text"></input>

        </div>

        <div className="buttoncont">
        <div onClick={this.send} className="button" id="loginbutton"><p>CREATE</p></div>
        </div>

    </div>

    </div>

    </div>

)


}


}


function mapDispatchToProps (dispatch) {
  
  return {
    changeToken: function (arg) {dispatch({
        type: "changetoken",
        token: arg
    })}
    
  }
  
}

export default connect(null, mapDispatchToProps)(CreateAccount);

