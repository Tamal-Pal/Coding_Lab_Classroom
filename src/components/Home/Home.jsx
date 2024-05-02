import useAuth from '../../hooks/useAuth'
import { Link, Outlet } from 'react-router-dom'
import NavigationBar from './NagivationBar'
import Footer from '../Footer/Footer'
import { USER_REGEX } from '../../config/REGEX'
import './Home.css'
import 'react-bootstrap'

const Home = () => {
    const { auth } = useAuth()

    return (
        USER_REGEX.test(auth.user_id) ?
            (<div className='home'>
                <NavigationBar id='navbar' />
                <div className='main'>
                    <Outlet />
                </div>
                <Footer/>
            </div>) : (
                <div className='App'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </div>
            )
    )
}

export default Home