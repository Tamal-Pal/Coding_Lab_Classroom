import { useState, useEffect } from "react"
import { GET_STUDENT_URL } from "../../../config/URL"
import customFetch from "../../../api/customFetch"
import './Chat.css'

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

    return <div className={`${className} chat`}>
        {
            studentName
            ? (<>{studentName}</>)
            : (<>Chat Window</>)
        }
    </div>
}

export default Chat