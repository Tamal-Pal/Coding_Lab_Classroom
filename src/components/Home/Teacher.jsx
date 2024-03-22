import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NewRoom from './ClassRoom/NewRoom'
import RoomViewer from './ClassRoom/RoomViewer/RoomViewer'

function Teacher() {

    const [roomRefresh, setRoomRefresh] = useState()

    return (
        <>
            <Container>
                <Row style={{ padding: '20px' }}>
                    <Col>
                        <NewRoom roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
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