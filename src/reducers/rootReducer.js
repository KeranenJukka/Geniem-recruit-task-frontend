
import React from 'react'
import {Link} from 'react-router-dom';




var initState = {

    token: ""

}


const rootReducer = (state=initState, action) => { 



if (action.type === "changetoken") {
        
        console.log(action)

        return {
            ...state,
            token: action.token
        }

    }

return state

}

export default rootReducer;