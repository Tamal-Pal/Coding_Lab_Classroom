import { useState, useEffect, useRef } from "react"
import { GET_STUDENT_URL } from "../../../config/URL"
import customFetch from "../../../api/customFetch"
import './Chat.css'
import Messages from "./Messages"
import useRole from '../../../hooks/useRole'

const Chat = ({ className, student_id, roomData, availability }) => {

    const [studentName, setStudentName] = useState(student_id)
    const role = useRole()

    const newMessage = useRef()

    const [messages, setMessages] = useState([
        ['teacher', 'message one'],
        ['student', 'message two'],
        ['student', 'message three'],
        ['teacher', 'message four'],
    ])

    const sendMessage = async (e) => {
        e.preventDefault()
        const msg = newMessage.current.value

        if (msg) {
            setMessages(prev => [...prev, [role, msg]])
            newMessage.current.value = ''
        }
    }

    useEffect(() => {
        const getData = async () => {
            const data = await customFetch(GET_STUDENT_URL(student_id), {
                token: localStorage.getItem('token')
            }).then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else return undefined
            })
            setStudentName(data?.student_name)
        }

        student_id && getData()
    }, [student_id])

    return <div className={`${className} chat`}>
        <h5 className="chat-header">
            <span className={`circle ${availability}`} />
            {
                studentName
                    ? (<>{studentName}</>)
                    : role === 'student' ?
                        (<>{roomData.fullname}</>)
                        : (<>Chat Window</>)
            }
        </h5>
        <hr />

        <div className="messages overflow-auto">
            <Messages messages={messages} />
        </div>

        <hr />
        <div className="new-message">
            <span>
                <textarea ref={newMessage} className="message-input" rows={1} placeholder="Message" />
                <a className="send-message" onClick={sendMessage}>
                    <i className="bi bi-send-fill"></i>
                </a>
            </span>
        </div>
    </div>
}

export default Chat