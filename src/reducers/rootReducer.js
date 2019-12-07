
import React from 'react'
import {Link} from 'react-router-dom';




var initState = {

    token: ""

}


const rootReducer = (state=initState, action) => { 



if (action.type === "changetoken") {
        
        

        return {
            ...state,
            token: action.token,
            user: action.user
        }

    }

return state

}

export default rootReducer;