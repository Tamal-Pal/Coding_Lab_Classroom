import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { TCH_REGEX, STU_REGEX } from '../../../config/REGEX'

const RoomCard = ({ room_name, room_id, room_admin }) => {

    const { auth } = useAuth()
    const { user_id } = auth

    const navigate = useNavigate()

    const enterRoom = async () => {
        if(TCH_REGEX.test(user_id)){
            navigate(`/classroom?room_id=${room_id}`)
        } else if(STU_REGEX.test(user_id)){
            navigate(`/editor?room_id=${room_id}`)
        }
    }

    return (
        <Card onClick={enterRoom}>
            <Card.Body>
                { room_name && <Card.Title>Room Name: {room_name}</Card.Title> }
                { room_id && <Card.Subtitle>Room ID: {room_id}</Card.Subtitle>}
                { room_admin && <Card.Subtitle>Room Admin: {room_admin}</Card.Subtitle>}
            </Card.Body>
        </Card>
    )
}

export default RoomCard