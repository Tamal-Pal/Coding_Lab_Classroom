import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import RoomCard from './RoomCards'
import { BASE_URL, GET_ROOMS } from '../../../../config/URL'

const RoomViewer = ({ roomRefresh }) => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            const result = await fetch(BASE_URL + GET_ROOMS, {
                credentials: 'include'
            }).then(res => res.json())
            setRooms(result)
        }

        fetchRooms()
    }, [roomRefresh])
    return (
        <Container className='room-viewer'>
            {
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