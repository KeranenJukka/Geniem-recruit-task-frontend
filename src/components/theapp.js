import React from 'react';
import {connect} from 'react-redux';

import './theapp.css';

import { Link } from 'react-router-dom';

const axios = require('axios');


class Theapp extends React.Component {

    constructor(props) {
        
        super();
    
     
    }


    componentDidMount() {
        console.log(this.props)
    }

render () {


    return (
        <div>

        <h1>THEAPPP</h1>

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