import React, { useEffect, useMemo, useState } from 'react'
import Chat from './Chat/Chat'
import CodeEditor from './CodeEditor/CodeEditor'
import InputOutput from './InputOutput/InputOutput'
import useQuery from '../../hooks/useQuery'
import customFetch from '../../api/customFetch'
import { GET_ROOM_DATA_URL } from '../../config/URL'
import './Editor.css'
import { JOIN, LEAVE } from '../../config/SocketEvent'
import useNotebookId from '../../hooks/useNotebookId'
import useAuth from '../../hooks/useAuth'
import useSocket from '../../hooks/useSocket'
import useRole from '../../hooks/useRole'

const Editor = () => {
    const { socket } = useSocket()
    const query = useQuery()
    const room_id = query.get('room_id')
    const student_id = query.get('student_id')
    const role = useRole()
    const [availability, setAvailability] = useState('offline')
    const [roomData, setRoomData] = useState({
        question: 'Loading...',
        language: 'Loading...'
    })
    const notebook = useNotebookId()
    const { auth } = useAuth()
    const roomDataNotFound = useMemo(() => {
        return {
            question: 'Question Not Found',
            language: 'Language Not Found'
        }
    }, [])

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const result = await customFetch(GET_ROOM_DATA_URL(room_id), {
                    token: localStorage.getItem('token')
                })

                if (result.status === 200) {
                    const data = await result.json()
                    setRoomData(data)
                    return
                }

                setRoomData(roomDataNotFound)
            } catch (e) {
                console.log(e)
                setRoomData(roomDataNotFound)
            }
        }

        fetchRoomData()
    }, [room_id, roomDataNotFound])

    useEffect(() => {

        socket?.emit(JOIN, { notebook, user_id: auth?.user_id })

        return () => {
            socket?.emit(LEAVE, { notebook, user_id: auth?.user_id })
        }
    }, [socket, notebook, auth])

    useEffect(() => {
        setInterval(() => {
            socket.emit('get-availability', { notebook })
        }, 500)

        socket.on('get-availability', ({ studentIsActive, teacherIsActive }) => {
            if (role === 'teacher' && studentIsActive) setAvailability('online')
            else if (role === 'teacher' && !studentIsActive) setAvailability('offline')
            else if (role === 'student' && teacherIsActive) setAvailability('online')
            else if (role === 'student' && !teacherIsActive) setAvailability('offline')
        })
    }, [setAvailability, socket, role, notebook])

    return (
        <>
            <div className='row' style={{ height: '100%', padding: 0, margin: 0 }}>
                <Chat
                    className='col-md-2 editor-child'
                    student_id={student_id}
                    roomData={roomData}
                    notebook={notebook}
                    availability={availability}
                />
                <CodeEditor
                    socket={socket}
                    className='col-md-8 editor-child'
                    roomData={roomData}
                    readOnly={role === 'teacher' && availability === 'offline'}
                />
                <InputOutput className='col-md-2 editor-child' roomData={roomData} />
            </div>
        </>
    )
}

export default Editor