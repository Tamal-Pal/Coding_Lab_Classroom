import React, { useEffect, useMemo, useState } from 'react'
import Chat from './Chat/Chat'
import CodeEditor from './CodeEditor/CodeEditor'
import InputOutput from './InputOutput/InputOutput'
import useQuery from '../../hooks/useQuery'
import customFetch from '../../api/customFetch'
import { GET_ROOM_DATA_URL } from '../../config/URL'
import './Editor.css'
import { initSocket } from '../../config/Socket'
import SocketEvent, { CONNECT_ERROR, CONNECT_FAILED } from '../../config/SocketEvent'
import useNotebookId from '../../hooks/useNotebookId'
import useAuth from '../../hooks/useAuth'

const Editor = () => {
    const [socket, setSocket] = useState()
    const query = useQuery()
    const room_id = query.get('room_id')
    const student_id = query.get('student_id')
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
        const init = async () => {
            setSocket(await initSocket())
        }

        init()

        return () => {
            socket?.disconnect()
            // socket?.off(SocketEvent.JOINED)
            socket?.off(SocketEvent.DISCONNECTED)
        }
    }, [setSocket])

    useEffect(() => {
        socket?.on(CONNECT_ERROR, (err) => console.error(err))
        socket?.on(CONNECT_FAILED, (err) => console.error(err))

        socket?.emit('join', { notebook, user_id: auth?.user_id })
    }, [socket, notebook, auth])

    return (
        <>
            <div className='row' style={{ height: '100%', padding: 0, margin: 0 }}>
                <Chat className='col-md-2 editor-child' student_id={student_id} />
                <CodeEditor socket={socket} className='col-md-8 editor-child' roomData={roomData} />
                <InputOutput className='col-md-2 editor-child' roomData={roomData} />
            </div>
        </>
    )
}

export default Editor