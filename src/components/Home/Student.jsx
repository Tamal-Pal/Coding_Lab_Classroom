import React from 'react'
import useAuth from '../../hooks/useAuth'

function Student() {
    const { setAuth } = useAuth()

    return (
        <>
            <h1>Logged In As Student</h1>
            <button onClick={() => setAuth({})}>Log Out</button>
        </>
    )
}

export default Student