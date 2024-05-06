import { useState, useEffect, useRef, useId } from "react"
import { GET_STUDENT_URL } from "../../../config/URL"
import customFetch from "../../../api/customFetch"
import './Chat.css'
import Messages from "./Messages"
import useRole, { oppositeRole } from '../../../hooks/useRole'
import useSocket from '../../../hooks/useSocket'
import useNotebookId from '../../../hooks/useNotebookId'

const Chat = ({ className, student_id, roomData, availability }) => {

    const [studentName, setStudentName] = useState(student_id)
    const role = useRole()
    const { socket } = useSocket()
    const notebook = useNotebookId()
    const id = useId()

    const newMessage = useRef()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        try {
            setMessages(JSON.parse(localStorage.getItem(`messages_${notebook}`) || '[]'))
        } catch {
            setMessages([])
        }
    }, [setMessages, notebook])

    const sendMessage = async () => {
        const msg = newMessage.current.value

        socket.emit('message', { msg, notebook, role })
        // console.log('sent message', msg)

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

    useEffect(() => {
        socket?.on('message', ({ message }) => {
            // console.log('message', message)
            const receiver = oppositeRole(role)

            setMessages(messages => [...messages, [receiver, message]])
        })
    }, [socket])

    useEffect(() => {
        localStorage.setItem(`messages_${notebook}`, JSON.stringify(messages))
    }, [messages, notebook])

    useEffect(() => {

        const handleEnter = (e) => {
            if(e.ctrlKey && e.key === 'Enter') {
                sendMessage()
            }
        }
        document.getElementById(`message-input-${id}`).addEventListener('keydown', handleEnter)

        return () => {
            document.getElementById(`message-input-${id}`)?.removeEventListener('keydown', handleEnter)
        }
    }, [id]);

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
                <textarea ref={newMessage} id={`message-input-${id}`} className="message-input" rows={1} placeholder="Message" />
                <a className="send-message" onClick={sendMessage}>
                    <i className="bi bi-send-fill"></i>
                </a>
            </span>
        </div>
    </div>
}

export default Chat