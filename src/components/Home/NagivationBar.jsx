import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { LOGOUT_URL } from '../../config/URL'

const NavigationBar = () => {
    const navigate = useNavigate()

    const { auth, setAuth } = useAuth()

    const handleLogout = async () => {
        await fetch(LOGOUT_URL, {
            method: 'DELETE',
            credentials: 'include'
        })
        setAuth({})
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