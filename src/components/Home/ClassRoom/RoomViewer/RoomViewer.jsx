import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import RoomCard from './RoomCards'
import { GET_ROOMS_URL } from '../../../../config/URL'

const RoomViewer = ({ roomRefresh }) => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            const result = await fetch(GET_ROOMS_URL, {
                credentials: 'include'
            }).then(res => res.json())
            setRooms(result)
        }

        fetchRooms()
    }, [roomRefresh])
    return (
        <Container className='room-viewer'>
            {
                Array.isArray(rooms) &&
                rooms.reverse().map(({ room_name, room_id, room_admin }, i) => {
                    return <RoomCard 
                        key={i} 
                        room_name={room_name} 
                        room_id={room_id} 
                        room_admin={room_admin}
                    />
                })
            }
        </Container>
    )
}

export default RoomViewer