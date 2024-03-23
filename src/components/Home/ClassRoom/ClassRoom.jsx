import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useQuery from '../../../hooks/useQuery'
import { GET_ROOM_NAME_URL, GET_STUDENTS_URL } from '../../../config/URL'
import StudentCard from './StudentCard/StudentCard'

const ClassRoom = () => {

    const [students, setStudents] = useState([])
    const [roomName, setRoomName] = useState(null)

    const query = useQuery()
    const room_id = query.get('room_id')

    useEffect(() => {

        try {
            const getRoomName = async () => {
                const result = await fetch(GET_ROOM_NAME_URL(room_id), {
                    credentials: 'include'
                })
                if (result.status === 200) {
                    setRoomName((await result.json()).room_name)
                }
                else console.log('Status while fetching roomname:', result.status)
            }

            getRoomName()
        } catch (e) {
            console.log('cannot fetch room name')
        }

        try {
            const getStudents = async () => {
                const result = await fetch(GET_STUDENTS_URL(room_id), {
                    credentials: 'include'
                })
                if (result.status === 200) setStudents(await result.json())
                else console.log(result.status)
            }
            getStudents()

        } catch (e) {
            console.log('cannot fetch students of this room')
        }
    }, [])

    return (
        <>
            <Container>
                <br />
                <h3>{roomName}</h3>
                <div className='classroom-container'>
                    {
                        students.map((student, i) => {
                            return <StudentCard key={i} student={student} />
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default ClassRoom