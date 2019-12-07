import React from 'react';
import {connect} from 'react-redux';

import './theapp.css';

import { Link } from 'react-router-dom';

import check from '../pictures/check.png'
import check2 from '../pictures/check2.png'

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
        this.props.history.push('/');

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

        
        var post = {
            id: id,
            token: this.props.token,
            
        }
        
        axios.post('http://localhost:8080/deletepost', post)
        .then((response) => {

            
            if (response.data === "error") {this.props.history.push('/');}

            this.getPosts();

        })
        
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

                    <div onClick={() => this.check(x.id)} className="check">
                        <div className="dot" id={x.id}></div>
                    </div>

                    <div className="posttext">
                       <input maxLength="50" id={x.id} onChange={this.changePost} className="postinput" defaultValue={x.description} type="text"></input>
                    </div>

                    <div onClick={()=> this.deletePost(x.id, "token", "userid")} className="deletebutton">
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

        
    }

render () {


    return (
        <div id="theappcont">


        <div id="theapp">

       
        <div id="theappstart">

        <div id="theappbox">
        
        <div onClick={this.logOut} id="logoutbutton">
        <p>Logout</p>
        </div>

        </div>

        <div id="theapptext">

            <p>{this.state.date}</p>
            <p>Welcome {this.state.user}</p>
            
        </div>

        </div>



        <div onClick={this.addPost} id="addpost"><p>ADD POST</p></div>

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