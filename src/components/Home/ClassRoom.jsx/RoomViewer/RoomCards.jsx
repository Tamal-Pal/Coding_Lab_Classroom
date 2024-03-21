import React from 'react'
import { Card } from 'react-bootstrap'

const RoomCard = ({ room_name, room_id }) => {

    const enterRoom = async () => {
        
    }

    return (
        <Card onClick={enterRoom}>
            <Card.Body>
                Room Name: {room_name}
                <Card.Subtitle>Room ID: {room_id}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default RoomCard