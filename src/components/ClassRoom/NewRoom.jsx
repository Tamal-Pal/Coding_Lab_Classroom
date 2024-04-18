import { useState } from 'react'
import { NEW_ROOM_URL } from '../../config/URL'
import customFetch from '../../api/customFetch'

const NewRoom = ({ setRoomRefresh }) => {

    const [roomName, setRoomName] = useState('')

    const createRoom = async (e) => {
        e.preventDefault()

        if (!roomName) return

        try {
            await customFetch(NEW_ROOM_URL, {
                method: 'POST',
                token: localStorage.getItem('token'),
                body: JSON.stringify({ "room_name": roomName })
            })
            setRoomRefresh(new Date().getTime())
            setRoomName('')
        } catch (e) {
            console.log('Cannot Create Room')
        }
    }

    return (
        <>
            <div>New Room Name/Description</div>

            <form>
                <input
                    type='text'
                    value={roomName}
                    onChange={(e) => { setRoomName(e.target.value) }}
                    required
                />
                <button onClick={createRoom}>Create Room</button>
            </form>
        </>
    )
}

export default NewRoom