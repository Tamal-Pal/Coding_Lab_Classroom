import React from 'react'
import Container from 'react-bootstrap/Container'
import './Footer.css'

function Footer() {
    return (
        <Container className='footer-container'>
            <footer className="py-3 my-4">
                <p className="text-center text-muted">Made with Love<hr />Students of AEC</p>
            </footer>
        </Container>
    )
}

export default Footer