import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import NotFound from "../../pages/404"

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
    const router = useRouter();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (getCookie('token')) {
            console.log(getCookie('token'));
            axios.post('/api/CheckUser').then(response => {
                if (response.status == 200) {
                    setUserData(response.data);
                    localStorage.setItem('userData', JSON.stringify(response.data));
                }
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={userData}>
            {Object.keys(userData).length ? children : <NotFound />}
        </AuthContext.Provider>
    )
}
