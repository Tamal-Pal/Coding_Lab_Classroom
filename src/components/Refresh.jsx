import React, { useEffect } from 'react'
import { BASE_URL, REFRESH_URL } from '../config/URL'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Refresh = () => {

    const { setAuth } = useAuth()

    useEffect(() => {

        const refresh = async () => {
            try {
                const result = await fetch(BASE_URL + REFRESH_URL, {
                    credentials: 'include'
                }).then(res => res.json())
                
                const { user, user_id, fullname } = result
                if(user && user_id && fullname) setAuth({ user, user_id, fullname })
            } catch(e) {
                console.log('an error occurred')
                console.error(e)
            }
        }
        refresh()

    }, [])

    return (
        <Outlet />
    )
}

export default Refresh