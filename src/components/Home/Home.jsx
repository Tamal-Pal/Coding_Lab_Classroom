import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, Outlet } from 'react-router-dom'
import NavigationBar from './NagivationBar'
import { STU_REGEX, TCH_REGEX, USER_REGEX } from '../../config/REGEX'
import Teacher from './Teacher'
import Student from './Student'
import Unauthorized from '../Unauthorized/Unauthorized'
import './Home.css'
import 'react-bootstrap'

const Home = () => {
    const { auth } = useAuth()

    return (
        USER_REGEX.test(auth.user_id) ?
            (
                <>
                    <NavigationBar />
                    {
                        TCH_REGEX.test(auth.user_id)
                            ? <Teacher />
                            : STU_REGEX.test(auth.user_id)
                                ? <Student />
                                : <Unauthorized />
                    }
                    <Outlet />
                </>
            )
            : (<div className='App'><Link to='/login'>Login</Link></div>)
    )
}

export default Home