import React, { useEffect, useState } from 'react'
import Chat from './Chat/Chat'
import CodeEditor from './CodeEditor/CodeEditor'
import InputOutput from './InputOutput/InputOutput'
import useQuery from '../../hooks/useQuery'
import customFetch from '../../api/customFetch'
import { GET_ROOM_DATA_URL } from '../../config/URL'
import './Editor.css'

const Editor = () => {
    const query = useQuery()
    const room_id = query.get('room_id')
    const student_id = query.get('student_id')
    const [roomData, setRoomData] = useState({
        question: 'Loading...',
        language: 'Loading...'
    })
    const roomDataNotFound = {
        question: 'Question Not Found',
        language: 'Language Not Found'
    }

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
    }, [])

    return (
        // <div>
        //     Editor,
        //     {room_id && <><br />RoomId: {room_id}</>}
        //     {student_id && <><br />StudentId: {student_id}</>}
        //     {roomData.question && <><br />Question: {roomData.question}</>}
        //     {roomData.language && <><br />Lanugage: {roomData.language}</>}
        // </div>

        <>
            <div className='row' style={{ height: '100%', padding: 0, margin: 0 }}>
                <Chat className='col-md-3 editor-child' student_id={student_id} />
                <CodeEditor className='col-md-7 editor-child' roomData={roomData} />
                <InputOutput className='col-md-2 editor-child' roomData={roomData} />
            </div>
        </>
    )
}

export default Editor