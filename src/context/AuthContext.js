import {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const history = useHistory();
    const [user, SetUser] = useState({
        User: '',
        Email: '',
        password: '',
        isAuth: false,
    });

    const data = {
        AuthContextState: user.isAuth,
        toggleIsAuthContext: ToggleAuth,
        user: '',
        email: user.Email,
        setEmail: SetUser.Email,
    }

    function ToggleAuth(e) {
        if (user.isAuth === false) {
            console.log("Je bent nu ingelogd")
            e.preventDefault()
            SetUser({...user, isAuth: true})
            history.push("/")
        } else {
                SetUser({...user, isAuth: false})
            console.log("Je bent nu uitgelogd")
            history.push("/")
        }
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

