import { useState } from 'react'
import { BASE_URL, JOIN_ROOM } from '../../../config/URL'

const JoinRoom = ({ setRoomRefresh }) => {

    const [roomID, setRoomID] = useState('')

    const joinRoom = async (e) => {
        e.preventDefault()

        console.log('join room button clicked')
        console.log(roomID)
        if(!roomID) return

        try{
            await fetch(BASE_URL + JOIN_ROOM, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room_id: roomID })
            })
            setRoomRefresh(new Date().getTime())
            setRoomID('')
        } catch(e) {
            console.log('Cannot Join Room')
        }

    }

    return (
        <>
            <div>Enter Room ID to Join Room</div>

            <form>
                <input
                    type='text'
                    value={roomID}
                    onChange={(e) => { setRoomID(e.target.value) }}
                    required
                />
                <button onClick={joinRoom}>Join Room</button>
            </form>
        </>
    )
}

export default JoinRoom