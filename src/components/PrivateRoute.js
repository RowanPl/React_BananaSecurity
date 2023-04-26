import { Route, Redirect } from 'react-router-dom'
import {useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import checkValidationOfJWT from "../helpers/checkValidationOfJWT";



function PrivateRoute({children}){

    const {hasAuth} = useContext(AuthContext)
    const token = localStorage.getItem('token');
    if (token && checkValidationOfJWT(token)) {
        hasAuth.hasAuth = true;
    }
    else {
        hasAuth.hasAuth = false;
    }


    return(
        <Route>
            {!hasAuth.hasAuth
                ?
                <Redirect to="/signin" />
                :
                children}
        </Route>
    )
}
export default PrivateRoute;