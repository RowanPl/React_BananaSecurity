import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";


function SignIn() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(false)

    async function logUserIn(e) {
        e.preventDefault();
        // setError(false);
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password
            })
            console.log(result.data.accessToken);
            login(result.data.accessToken);

        } catch (err) {
            console.error(err);
            // setError(true);
        }

    }


    return (
        <>


            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={logUserIn}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                {/*{error && <p className="error"> oeps er ging iets mis </p> }*/}

                <label htmlFor="password-field">
                    Password:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    className="form-button"
                >
                    Login
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;