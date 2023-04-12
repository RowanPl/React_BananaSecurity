import { Route, Redirect } from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


function PrivateRoute({children}){

    const {AuthContextState} = useContext(AuthContext)
    console.log(AuthContextState)

    return(
        <Route>
            {!AuthContextState
                ?
                <Redirect to="/signin" />
                :
                children}
        </Route>
    )
}
export default PrivateRoute;