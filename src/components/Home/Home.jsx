import useAuth from '../../hooks/useAuth'
import { Link, Outlet } from 'react-router-dom'
import NavigationBar from './NagivationBar'
import { USER_REGEX } from '../../config/REGEX'
import './Home.css'
import 'react-bootstrap'

const Home = () => {
    const { auth } = useAuth()

    return (
        USER_REGEX.test(auth.user_id) ?
            (<>
                <NavigationBar id='navbar'/>
                <Outlet />
            </>) : (
                <div className='App'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </div>
            )
    )
}

export default Home