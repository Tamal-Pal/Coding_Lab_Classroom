import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NewRoom from './ClassRoom.jsx/NewRoom'
import RoomViewer from './ClassRoom.jsx/RoomViewer/RoomViewer'

function Teacher() {

    const [roomRefresh, setRoomRefresh] = useState();

    return (
        <>
            <Container>
                <Row style={{padding: '20px'}}>
                    <Col>
                        <NewRoom roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh}/>
                    </Col>
                    <Col>
                        <RoomViewer roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teacher