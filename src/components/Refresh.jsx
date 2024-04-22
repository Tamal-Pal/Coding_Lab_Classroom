import React, { useEffect } from 'react'
import { REFRESH_URL } from '../config/URL'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import customFetch from '../api/customFetch'

const Refresh = () => {

    const { setAuth } = useAuth()

    useEffect(() => {

        const refresh = async () => {
            try {
                await customFetch(REFRESH_URL, {
                    token: localStorage.getItem('token')
                }).then(async (res) => {
                    setAuth({})
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
                console.error('Can not refresh', e)
            }
        }
        refresh()

    }, [setAuth])

    return (
        <Outlet />
    )
}

export default Refresh