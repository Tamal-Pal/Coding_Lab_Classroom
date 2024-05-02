import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NewRoom from '../Room/NewRoom'
import RoomViewer from '../Room/RoomViewer/RoomViewer'

function Teacher() {

    const [roomRefresh, setRoomRefresh] = useState()

    return (
        <>
            <Container>
                <Row style={{ padding: '20px' }}>
                    <Col>
                        <NewRoom roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
                    </Col>
                    <Col style={{ display: 'flex' }}>
                        <RoomViewer roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teacher