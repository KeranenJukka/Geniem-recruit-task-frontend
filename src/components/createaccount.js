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
    document.getElementById("user").style.color = "var(--color2)";

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
      document.getElementById("user").style.color = "var(--color2)";

      return null
    }
    
    else {


      var cont = document.getElementById("createcont1");
      var cont2 = document.getElementById("createcont2");
      
      TweenMax.to(cont, 0.5, {opacity: 0});
      TweenMax.to(cont2, 0, {opacity: 0});

      setTimeout(() => {
        cont.style.display = "none";
        cont2.style.display = "initial";
        TweenMax.to(cont2, 0.5, {opacity: 1});

      }, 350);
      

      

    }

  })


}


send = () => {

  
  var first = "First Name"
  var pass = "Password"


    if (this.info.firstname.length === 0 || this.info.password.length < 6) {
      

      if (this.info.firstname.length === 0) {
        first = "Pick a name!"
        document.getElementById("first").style.color = "var(--color2)";
      }

      else {document.getElementById("first").style.color = "black";}

      if (this.info.password.length < 6) {
        pass = "Pick a password that is at least 6 characters long!"
        document.getElementById("pass").style.color = "var(--color2)";
      }

      else {document.getElementById("pass").style.color = "black";}

      this.setState({
        firstname: first,
        password: pass
      })

      return null

    }


    var infoSend = {...this.info}



  /* -------Store info--------*/


      axios.post('http://localhost:8080/adduser', infoSend)
    .then( (response) => {
      
      if (response.data.res === "success") {
        
       this.props.changeToken(response.data.token, response.data.user)

      var cont2 = document.getElementById("createcont2");

      TweenMax.to(cont2, 0.5, {opacity: 0})

      setTimeout(() => {
        this.props.history.push('/theapp');
      }, 500);

      

      }
      
    })
    .catch(function (error) {
      
    });
    
      

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


press = () => {
  
  var button = document.getElementById("loginbutton2");
  
  
  TweenMax.to(button, 0.12, {css:{scaleX:0.8, scaleY:0.8}});
  TweenMax.to(button, 0.12, {css:{scaleX:1, scaleY:1}, delay: 0.12});
  
  setTimeout(() => {
      
      this.checkName();

  }, 350);

}

press2 = () => {
  
  var button = document.getElementById("loginbutton3");
  
  
  TweenMax.to(button, 0.12, {css:{scaleX:0.8, scaleY:0.8}});
  TweenMax.to(button, 0.12, {css:{scaleX:1, scaleY:1}, delay: 0.12});
  
  setTimeout(() => {
      
      this.send();

  }, 350);

}

componentDidMount () {

  var cont1 = document.getElementById("createcont1");
  TweenMax.to(cont1, 0.5, {opacity: 1})

}


render () {

return (

    <div id="createwrap">

    <div className="loginwrap2">

    <div id="createcont1">

    <div className="createaccountcont">

       <h1 className="thetitle" >Create Account</h1>

        <div className="form">
            <p id="user" className="info">{this.state.username}</p>
            <input id="username" maxLength="20" onChange={this.change} type="text"></input>


        </div>

        <div onClick={this.press} className="buttoncont" id="loginbutcont">
        <div className="button" id="loginbutton2"><p>CREATE</p></div>
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
        <div onClick={this.press2} className="button" id="loginbutton3"><p>CREATE</p></div>
        </div>

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

export default connect(null, mapDispatchToProps)(CreateAccount);

