import React from 'react'
import JoinRoom from './ClassRoom.jsx/JoinRoom'
import RoomViewer from './ClassRoom.jsx/RoomViewer/RoomViewer'
import { Container, Row, Col } from 'react-bootstrap'

function Student() {

    return (
        <>
            <Container>
                <Row style={{padding: '20px'}}>
                    <Col>
                        <JoinRoom/>
                    </Col>
                    <Col>
                        <RoomViewer/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Student