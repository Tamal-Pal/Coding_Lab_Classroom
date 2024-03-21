import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const NewRoom = ({ setRoomRefresh }) => {

    const { auth } = useAuth()

    const [roomName, setRoomName] = useState('')

    const createRoom = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:3001/api/newroom', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ "room_name": roomName })
        })
        setRoomRefresh(new Date().getTime())
        setRoomName('')
    }

    return (
        <>
            <div>Create a New Room</div>

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