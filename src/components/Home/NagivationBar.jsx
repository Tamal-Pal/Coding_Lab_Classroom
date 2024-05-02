import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { LOGOUT_URL } from '../../config/URL'
import customFetch from '../../api/customFetch'
import useSocket from '../../hooks/useSocket'

const NavigationBar = () => {
    const navigate = useNavigate()

    const { auth, setAuth } = useAuth()
    const { socket, setSocket } = useSocket()

    const handleLogout = async () => {
        await customFetch(LOGOUT_URL, {
            method: 'DELETE',
            token: localStorage.getItem('token')
        })
        socket.disconnect()
        setSocket({})
        localStorage.removeItem('token')
        setAuth({})
        navigate('/')
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <Navbar className="navigation-bar">
            <Container>
                <Navbar.Brand onClick={goHome} style={{'cursor': 'pointer'}}>Coding Classroom</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/login">{auth.fullname}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
                &nbsp; &nbsp;
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Container>
        </Navbar>
    )
}

export default NavigationBar