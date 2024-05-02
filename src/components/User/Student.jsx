import React, { useState } from 'react'
import JoinRoom from '../Room/JoinRoom'
import RoomViewer from '../Room/RoomViewer/RoomViewer'
import { Container, Row, Col } from 'react-bootstrap'

function Student() {

    const [roomRefresh, setRoomRefresh] = useState()

    return (
        <>
            <Container>
                <Row style={{padding: '20px'}}>
                    <Col>
                        <JoinRoom roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
                    </Col>
                    <Col>
                        <RoomViewer roomRefresh={roomRefresh} setRoomRefresh={setRoomRefresh} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Student