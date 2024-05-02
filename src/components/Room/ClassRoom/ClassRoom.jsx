import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useQuery from '../../../hooks/useQuery'
import { GET_ROOM_DATA_URL, GET_STUDENTS_URL } from '../../../config/URL'
import StudentCard from '../StudentCard/StudentCard'
import customFetch from '../../../api/customFetch'
import './ClassRoom.css'

const ClassRoom = () => {

    const [students, setStudents] = useState([])
    const [roomName, setRoomName] = useState(null)
    const [question, setQuestion] = useState(null)
    const [language, setLanguage] = useState(null)

    const query = useQuery()
    const room_id = query.get('room_id')

    useEffect(() => {

        try {
            const getRoomData = async () => {
                const result = await customFetch(GET_ROOM_DATA_URL(room_id), { token: localStorage.getItem('token')})
                if (result.status === 200) {
                    const data = await result.json()
                    setRoomName(data.room_name)
                    setQuestion(data.question)
                    setLanguage(data.language)
                }
                else console.log('Status while fetching roomdata:', result.status)
            }

            getRoomData()
        } catch (e) {
            console.log('cannot fetch room name')
        }

        try {
            const getStudents = async () => {
                const result = await customFetch(GET_STUDENTS_URL(room_id), {
                    token: localStorage.getItem('token')
                })
                if (result.status === 200) setStudents(await result.json())
                else console.log(result.status)
            }
            getStudents()

        } catch (e) {
            console.log('cannot fetch students of this room')
        }
    }, [room_id])

    return (
        <>
            <Container>
                <br />
                <h3>{roomName}</h3>
                <p>{question}</p>
                <p>{language}</p>
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