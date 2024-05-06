import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useQuery from '../../../hooks/useQuery'
import { GET_ROOM_DATA_URL, GET_STUDENTS_URL } from '../../../config/URL'
import StudentCard from '../StudentCard/StudentCard'
import customFetch from '../../../api/customFetch'
import './ClassRoom.css'
import '../Room.css'
import useSocket from '../../../hooks/useSocket'
import useRole from '../../../hooks/useRole'
import LangIcon from '../../../config/LangIcon/LangIcon'

const ClassRoom = () => {

    const [students, setStudents] = useState([])
    const [pendingStudents, setPendingStudents] = useState([])
    const [roomName, setRoomName] = useState(null)
    const [question, setQuestion] = useState(null)
    const [language, setLanguage] = useState(null)

    const query = useQuery()
    const room_id = query.get('room_id')
    const role = useRole()

    const { socket } = useSocket()

    useEffect(() => {

        try {
            const getRoomData = async () => {
                const result = await customFetch(GET_ROOM_DATA_URL(room_id), { token: localStorage.getItem('token') })
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

    useEffect(() => {
        const intervalID = setInterval(() => {
            socket.emit('pending-in-room', { room: room_id, role })
        }, 500)

        socket?.on('pending-in-room', (pendingNotebooks) => {
            const ps = []
            pendingNotebooks.map(notebook => {
                ps.push(notebook.split('_')[1])
            })

            setPendingStudents(ps)
        })
        return () => {
            clearInterval(intervalID)
        }
    }, [room_id, socket, role])

    return (
        <>
            <Container>
                <br />
                <div className='text-white'>
                    <h1>
                        Classroom: <u>{roomName}</u>
                    </h1>
                    <h4>Question: <LangIcon lang={language} height={40}/> {question}</h4>
                </div>
                <div className='classroom-container'>
                    {
                        students?.map((student, i) => {
                            return <StudentCard
                                key={i}
                                student={student}
                                pending={pendingStudents.includes(student.student_id)}
                            />
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default ClassRoom