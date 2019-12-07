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


    changePost = (e) => {

        

        var text = e.target.value;
        var id = parseInt(e.target.id);
        
        console.log(typeof text)

        var post = {
            id: id,
            token: "moi",
            userId: 1,
            text: text
        }
     
        axios.post('http://localhost:8080/changepost', post)
        .then(() => {
            
        
        })
        
    }


    deletePost = (id, token, userId) => {

        

        var post = {
            id: id,
            token: "moi",
            userId: 1
        }

        
        axios.post('http://localhost:8080/deletepost', post)
        .then(() => {
            
            this.getPosts();

        })
        
    }

    getPosts = (id, token) => {

        var posts;

        axios.post('http://localhost:8080/getposts', {
            id: 1,
            token: 'Flintstone'
          })
          .then((response) => {

                        
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


    addPost = (id, token) => {

        var post = {
            title: "post",
            description: "Write here...",
            userId: 1,
            checkbox: "no"
        }

        axios.post('http://localhost:8080/addpost', post)
        .then(() => {
            
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
            date: date
        })


        this.getPosts();


    }

render () {


    return (
        <div id="theappcont">

        <div id="theapp">
        
        <div id="theappstart">

        <div id="theappbox"></div>

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
        token: state.token
    }
}

function mapDispatchToProps (dispatch) {
  
    return {
      changeLanguage: function (arg) {dispatch({
          type: "change",
          language: arg
      })}
      
    }
    
  }

export default connect(mapStateToProps, mapDispatchToProps)(Theapp);