import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({ room_name, room_id }) => {

    const navigate = useNavigate()

    const enterRoom = async () => {
        navigate('/qwer')
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