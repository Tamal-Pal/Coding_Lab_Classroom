import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './Navbar/UserNavbar'

function UserLayout() {
    return (
        <>
            <UserNavbar />
            <Outlet />
        </>
    )
}

export default UserLayout