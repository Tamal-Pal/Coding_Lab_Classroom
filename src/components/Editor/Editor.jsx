import React, { useEffect, useState } from 'react'
import useQuery from '../../hooks/useQuery'
import customFetch from '../../api/customFetch'
import { GET_ROOM_DATA_URL, GET_STUDENT_URL } from '../../config/URL'
import './Editor.css'

const Chat = ({ className, student_id }) => {

    const [studentName, setStudentName] = useState(student_id)

    useEffect(() => {
        const getData = async () => {
            const data = await customFetch(GET_STUDENT_URL(student_id), {
                token: localStorage.getItem('token')
            }).then(res => {
                if(res.status === 200){
                    return res.json()
                }
                else return undefined
            })
            setStudentName(data?.student_name)
        }

        getData()
    }, [])

    return <div className={className}>
        {
            studentName
            ? (<>{studentName}</>)
            : (<>Chat Window</>)
        }
    </div>
}

const CodeEditor = ({ className, roomData }) => {
    return <div className={`${className} code`}>
        <div style={{ flex: 1 }}>{roomData.question}</div>
        <div style={{ flex: 4 }}>Code</div>
    </div>
}

const InputOutput = ({ className }) => {
    return <div className={`${className} io`}>
        <div>Input</div>
        <div>Output</div>
    </div>
}

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
            <div className='container row' style={{ height: '100%' }}>
                <Chat className='col-md-3' student_id={student_id} />
                <CodeEditor className='col-md-8' roomData={roomData} />
                <InputOutput className='col-md-1' roomData={roomData} />
            </div>
        </>
    )
}

export default Editor