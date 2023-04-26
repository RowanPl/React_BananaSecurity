import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import checkValidationOfJWT from "../helpers/checkValidationOfJWT";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const history = useHistory();

    const [hasAuth, toggleIsAuth] = useState({
        hasAuth: false,
        user: null,
        status: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && checkValidationOfJWT(token)) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            void fetchUserData(decoded, token );
        }
         else {
            toggleIsAuth({
                hasAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    async function fetchUserData(decodedToken, token ,redirectUrl ) {
        try {
        //     if (checkValidationOfJWT(token))
        //     history.push("/")
        //     localStorage.clear();
        // }
            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data)
            toggleIsAuth({
                hasAuth: true,
                user: {
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email
                },
                status: 'done'
            }
            )
            console.log(hasAuth.user);
            if (redirectUrl) {
                history.push(redirectUrl);
            }
        }
        catch (e) {
          toggleIsAuth({
               hasAuth: false,
                user: null,
              status: 'done'
          })
        }
    }

     useEffect(()=> { console.log(hasAuth.status) }, [hasAuth.status] );


    const contextData = {
        hasAuth: hasAuth,
        user: hasAuth.user,
        login: login,
        logout: logout,
    };

    function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        void fetchUserData(decodedToken, token, "/profile");
        }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            hasAuth: false,
            user: null,
            status: 'done'
        });
        history.push("/")
    }


    return (
        <AuthContext.Provider value={contextData}>
            {hasAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

