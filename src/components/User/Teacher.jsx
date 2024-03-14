import React from 'react'
import useAuth from '../../hooks/useAuth'

function Teacher() {
    const { setAuth } = useAuth()

    return (
        <>
            <h1>Logged In As Teacher</h1>
            <button onClick={() => setAuth({})}>Log Out</button>
        </>
    )
}

export default Teacher