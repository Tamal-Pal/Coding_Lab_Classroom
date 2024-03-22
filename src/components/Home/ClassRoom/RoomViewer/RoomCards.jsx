import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({ room_name, room_id, room_admin }) => {

    const navigate = useNavigate()

    const enterRoom = async () => {
        navigate('/qwer')
    }

    return (
        <Card onClick={enterRoom}>
            <Card.Body>
                { room_name && (<>Room Name: {room_name}</>) }
                { room_id && (<Card.Subtitle>Room ID: {room_id}</Card.Subtitle>)}
                { room_admin && <Card.Subtitle>Room Admin: {room_admin}</Card.Subtitle>}
            </Card.Body>
        </Card>
    )
}

export default RoomCard