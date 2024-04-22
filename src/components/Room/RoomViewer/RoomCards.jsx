import React, { useId, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { TCH_REGEX, STU_REGEX } from '../../../config/REGEX'
import { isTeacher } from '../../../config/User'

const RoomCard = ({ room_name, room_id, room_admin }) => {

    const { auth } = useAuth()
    const { user_id } = auth

    const navigate = useNavigate()

    const enterRoom = () => {
        if (TCH_REGEX.test(user_id)) {
            navigate(`/classroom?room_id=${room_id}`)
        } else if (STU_REGEX.test(user_id)) {
            navigate(`/editor?room_id=${room_id}`)
        }
    }

    const buttonId = `button${useId()}`

    const [copied, setCopied] = useState(false)

    const handleBodyClick = (event) => {
        if (event.target.id === buttonId) {
            try{
                navigator.clipboard.writeText(room_id)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch(e) {
                window.alert(`Cannot Copy Room ID. Copy it from here ${room_id}`)
            }
        }
        else {
            enterRoom()
        }
    }

    return (
        <>
            <Card>
                <Card.Body onClick={handleBodyClick}>
                    <Card.Title>
                        {room_name && <Card.Title>Room Name: {room_name}</Card.Title>}
                    </Card.Title>
                    {room_id && <Card.Subtitle>Room ID: {room_id}</Card.Subtitle>}
                    {room_admin && <Card.Subtitle>Room Admin: {room_admin}</Card.Subtitle>}
                    {isTeacher(user_id) && <span className='btn btn-secondary copy-button' id={buttonId}>
                        Copy Room ID 
                        <span className='clipboard-icon'>
                        {copied 
                            ? <i className="bi bi-check"></i>
                            : <i className="bi bi-clipboard"></i>
                        }</span>
                    </span>}
                </Card.Body>
            </Card>
        </>
    )
}

export default RoomCard