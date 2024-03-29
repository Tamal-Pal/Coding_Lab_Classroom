import React, { useEffect } from 'react'
import { REFRESH_URL } from '../config/URL'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Refresh = () => {

    const { setAuth } = useAuth()

    useEffect(() => {

        const refresh = async () => {
            try {
                fetch(REFRESH_URL, {
                    credentials: 'include'
                }).then(async (res) => {
                    if(res.status === 401){
                        setAuth({})
                    } else {
                        const result = await res.json()
                        const { user, user_id, fullname } = result
                        if(user && user_id && fullname) setAuth({ user, user_id, fullname })
                        else setAuth({})
                    }
                })
            } catch(e) {
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