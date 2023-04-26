import React, { useContext, useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import checkValidationOfJWT from "../helpers/checkValidationOfJWT";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const {hasAuth, logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (checkValidationOfJWT(token)) {
            const decoded = jwtDecode(token);
            console.log(decoded);
            fetchProfileData(token);
            console.log(checkValidationOfJWT(token));
        }
        else {
           logout()
            history.push("/");
        }
    }, []);

    async function fetchProfileData(token) {
        await fetchData()
        async function fetchData() {
            const source = axios.CancelToken.source();
            try {
                const result = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setProfileData(result.data);
            } catch (e) {
                console.error(e);
            }
            return function cleanup() {
                source.cancel();
            }
        }
    }

    // if (!localStorage.getItem('token')) {
    //     return null
    // }


    return (
        <>

                    <h1>Profielpagina</h1>
                    <section>
                        <h2>Gegevens</h2>
                        <p><strong>Gebruikersnaam:</strong> {hasAuth.user.username}</p>
                        <p><strong>Email:</strong> {hasAuth.user.email}</p>
                    </section>

                    {Object.keys(profileData).length > 0 && (
                        <section>
                            <h2>Strikt geheime profiel-content</h2>
                            <h3>{profileData.title}</h3>
                            <p>{profileData.content}</p>
                        </section>
                    )}

                    <p>Terug naar de <Link to="/">Homepagina</Link></p>
                </>
    );
}

export default Profile;