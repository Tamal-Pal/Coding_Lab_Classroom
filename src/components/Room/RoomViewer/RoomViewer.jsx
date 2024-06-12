import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import RoomCard from './RoomCards'
import customFetch from '../../../api/customFetch'
import { GET_ROOMS_URL } from '../../../config/URL'
import './RoomViewer.css'
import useSocket from '../../../hooks/useSocket'
import useRole from '../../../hooks/useRole'

const RoomViewer = ({ roomRefresh }) => {

    const [rooms, setRooms] = useState([])

    const { socket } = useSocket()
    const role = useRole()
    const [pendingRooms, setPendingRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            const result = await customFetch(GET_ROOMS_URL, {
                token: localStorage.getItem('token')
            }).then(res => res.json())
            setRooms(result)

            // console.log('fetched rooms result', result)
        }

        fetchRooms()
    }, [roomRefresh])

    useEffect(() => {
        const intervalID = setInterval(() => {
            const room_ids = []
            rooms.map(room => {
                room_ids.push(room.room_id)
            })
            socket?.emit('pending-in-rooms', { rooms: room_ids, role })
        }, 500)

        socket?.on('pending-in-rooms', (data) => {
            if (JSON.stringify(pendingRooms) !== JSON.stringify(data.pendingRooms)) {
                setPendingRooms(data.pendingRooms)
            }
        })

        return () => {
            clearInterval(intervalID)
        }
    }, [socket, rooms, role])

    return (

        <Container className='room-viewer overflow-auto flex-grow'>
            {
                Array.isArray(rooms) && rooms?.map(({ room_name, room_id, room_admin }, i) => {
                    // console.log('mapping rooms', rooms)

                    return <RoomCard
                        key={i}
                        room_name={room_name}
                        room_id={room_id}
                        room_admin={room_admin}
                        pending={pendingRooms.includes(room_id)}
                    />
                })
            }
        </Container>
    )
}

export default RoomViewer