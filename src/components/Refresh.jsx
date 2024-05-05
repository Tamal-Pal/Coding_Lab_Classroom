import React, { useEffect } from 'react'
import { REFRESH_URL } from '../config/URL'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useSocket from '../hooks/useSocket'
import customFetch from '../api/customFetch'
import { initSocket } from '../config/Socket'
import SocketEvent from '../config/SocketEvent'

const Refresh = () => {

    const { setAuth } = useAuth()
    const { socket, setSocket } = useSocket()

    useEffect(() => {

        const refresh = async () => {
            try {
                await customFetch(REFRESH_URL, {
                    token: localStorage.getItem('token')
                }).then(async (res) => {
                    setAuth({})
                    if (res.status === 401) {
                        setAuth({})
                    } else {
                        const result = await res.json()
                        const { user, user_id, fullname } = result
                        if (user && user_id && fullname) {
                            setAuth({ user, user_id, fullname })
                            setSocket(await initSocket(user_id))
                        }
                        else setAuth({})
                    }
                })
            } catch (e) {
                console.error('Can not refresh', e)
            }
        }
        refresh()

    }, [setAuth, setSocket])

    useEffect(() => {
        return () => {

            try{
                // socket?.disconnect()
                // socket?.off(SocketEvent.JOINED)
                // socket?.off(SocketEvent.DISCONNECTED)
            }
            catch(e) {
                console.error('ERROR: Cannot Disconnect Socket', e)
            }
        }
    }, [socket])

    return (
        <Outlet />
    )
}

export default Refresh