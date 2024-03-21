import React from 'react'
import useAuth from '../../hooks/useAuth'
// import { BASE_URL } from '../../config/URL'

function Teacher() {

    const { auth, setAuth } = useAuth()

    const { accessToken } = auth

    const secret = async () => {
        const response = await fetch('http://localhost:3001/secret', {
            headers: {
                'authorization' : `Bearer ${accessToken}`
            }
        }).then(res => res.json())

        console.log(response)
    }

    return (
        <>
            <h1>Logged In As Teacher</h1>
            <button onClick={() => setAuth({})}>Log Out</button>

            <button onClick={secret}>Secret</button>
        </>
    )
}

export default Teacher