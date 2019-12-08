import React from 'react';
import {connect} from 'react-redux';

import './theapp.css';

import { Link } from 'react-router-dom';

import note from '../pictures/note.png';
import mountains from '../pictures/mountains.jpg'


import { TweenMax } from 'gsap/gsap-core';

const axios = require('axios');



class Theapp extends React.Component {

    constructor(props) {
        
        super();
    
        this.state = {
            user: "Someone",
            date: "",
            posts: []
        }

     
    }

    check = (e) => {

        console.log(e)

    }

    logOut = () => {

        this.props.changeToken("", "")
        
        var theapp = document.getElementById("theapp");
        TweenMax.to(theapp, 0.5, {opacity: 0})

        setTimeout(() => {
            this.props.history.push('/');
        }, 500);

    }

    changePost = (e) => {
      
        var text = e.target.value;
        var id = parseInt(e.target.id);
        
        if (text.length === 0) {text = " "}

        var post = {
            id: id,
            token: this.props.token,
            text: text
        }
     
        axios.post('http://localhost:8080/changepost', post)
        .then((response) => {
            
            if (response.data === "error") {this.props.history.push('/');}
        
        })
        
    }


    deletePost = (id, token, userId) => {

        var butId = "minus"+id;

        var button = document.getElementById(butId);

        TweenMax.to(button, 0.12, {css:{scaleX:0.8, scaleY:0.8}});
        TweenMax.to(button, 0.12, {css:{scaleX:1, scaleY:1}, delay: 0.12});

        setTimeout(() => {
            
        var post = {
            id: id,
            token: this.props.token,
            
        }
        
        axios.post('http://localhost:8080/deletepost', post)
        .then((response) => {

            
            if (response.data === "error") {this.props.history.push('/');}

            this.getPosts();

        })

         }, 350);
        
    }

    getPosts = () => {

        var posts;

        axios.post('http://localhost:8080/getposts', {
            token: this.props.token
          })
          .then((response) => {

            if (response.data === "error") {this.props.history.push('/');}
                        
            posts = response.data.map((x) => {

                

                return (
                    <div key={x.id} className="post">

                    <div className="note">
                        <img src={note}></img>
                    </div>

                    <div className="posttext">
                       <input onClick={this.removeText} maxLength="50" id={x.id} onChange={this.changePost} className="postinput" defaultValue={x.description} type="text"></input>
                    </div>

                    <div id={"minus"+x.id} onClick={()=> this.deletePost(x.id, "token", "userid")} className="deletebutton">
                        <div className="minus"></div>
                    </div>

                    </div>

                )

            })

            
            posts = posts.reverse();

            this.setState({
                posts: posts
            })



          })
          .catch(function (error) {
            
          });


        


    }


    addPost = () => {

        var post = {

            description: "Write here...",
            token: this.props.token
        }

        axios.post('http://localhost:8080/addpost', post)
        .then((response) => {
            
            if (response.data === "error") {this.props.history.push('/');}

            this.getPosts();


        })

    }

    pressPost = () => {

        var add = document.getElementById("addpost");

        TweenMax.to(add, 0.12, {css:{scaleX:0.8, scaleY:0.8}});
        TweenMax.to(add, 0.12, {css:{scaleX:1, scaleY:1}, delay: 0.12});

        setTimeout(() => {
      
            this.addPost();
      
        }, 350);


    }


    removeText = (e) => {

        if (e.target.value === "Write here...") {

            var input = document.getElementById(e.target.id)
            input.value = "";

            this.changePost(e);
        }
    }

componentDidMount() {
        

        var d = new Date();
        var m = new Date();
        var y = new Date();
        d = d.getDate();
        m = m.getMonth()+1;
        y = y.getFullYear();
        
        var date = d + "." + m + "." + y;
        
        this.setState({
            date: date,
            user: this.props.user,
        })


        this.getPosts();

        var theapp = document.getElementById("theapp");
        TweenMax.to(theapp, 0.5, {opacity: 1})

    }

render () {


    return (
        <div id="theappcont">


        <div id="theapp">

       
        <div id="theappstart">

        <img id="backgroundpic" src={mountains}></img>

        <div id="theappbox">
        
        <div onClick={this.logOut} id="logoutbutton">
        <p>Logout</p>
        </div>

        </div>

        <div id="theapptext">

            <p id="theappdate">{this.state.date}</p>
            <p id="theappuser">Welcome {this.state.user}</p>
            
        </div>

        </div>



        <div onClick={this.pressPost} id="addpost"><p>ADD POST</p></div>

        <div id="posts">
            {this.state.posts}
        </div>


        </div>

        </div>

    )

    }   
 }




const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(Theapp);