import { useRef, useState } from 'react'
import { NEW_ROOM_URL } from '../../config/URL'
import customFetch from '../../api/customFetch'
import languages from '../../config/Languages'

const NewRoom = ({ setRoomRefresh }) => {

    const roomName = useRef()
    const question = useRef()
    const [language, setLanguage] = useState('')

    const createRoom = async (e) => {
        e.preventDefault()

        if (!roomName) return

        try {
            await customFetch(NEW_ROOM_URL, {
                method: 'POST',
                token: localStorage.getItem('token'),
                body: JSON.stringify({ 
                    room_name: roomName.current.value,
                    question: question.current.value,
                    language
                })
            })
            setRoomRefresh(new Date().getTime())
            roomName.current.value = ''
        } catch (e) {
            console.log('Cannot Create Room')
        }
    }

    return (
        <>
            <h4>New Room</h4>

            <form>
                <label>Room Name/Description</label>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        ref={roomName}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Question</label>
                    <textarea
                        className="form-control" 
                        rows="3"
                        ref={question}
                    />
                </div>

                <div className='form-group'>
                    <label>Language</label>
                    <select style={{'height': '150px'}} multiple className="form-control">
                    {
                        languages.map((lang, i) => {
                            return (<option key={i} onClick={() => setLanguage(lang)}>{lang}</option>)
                        })
                    }
                    </select>
                </div>

                <div className='form-group'>
                    <button className='form-control btn btn-light' onClick={createRoom}>Create Room</button>
                </div>
            </form>
        </>
    )
}

export default NewRoom