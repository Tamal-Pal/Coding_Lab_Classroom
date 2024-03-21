import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import { Container } from 'react-bootstrap'
import RoomCard from './RoomCards'

const RoomViewer = ({ roomRefresh }) => {

    const [rooms, setRooms] = useState([])

    const { auth } = useAuth()

    useEffect(() => {
        const fetchRooms = async () => {
            const result = await fetch('http://localhost:3001/api/getRooms', {
                credentials: 'include'
            }).then(res => res.json())
            setRooms(result)
        }

        fetchRooms()
    }, [roomRefresh])
    return (
        <Container className='room-viewer'>
            {
                rooms.map(({ room_name, room_id }, i) => {
                    return <RoomCard key={i} room_name={room_name} room_id={room_id} />
                })
            }
        </Container>
    )
}

export default RoomViewer