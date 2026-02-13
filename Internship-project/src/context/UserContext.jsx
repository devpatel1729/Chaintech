import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({})
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const getData = async () => {
        const response = await axios.get(backendURL + '/data')
        console.log(response)
        setData(response.data.users)
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
    }

    useEffect(() => {
        getData();
    }, [])

    const values = { backendURL, data, getData, user }

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider