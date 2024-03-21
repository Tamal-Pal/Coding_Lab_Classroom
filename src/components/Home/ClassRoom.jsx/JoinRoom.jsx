import { useState } from 'react'

const JoinRoom = () => {

    const [roomID, setRoomID] = useState('')

    const joinRoom = async (e) => {
        e.preventDefault()

        // navigate to the editor of that room
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
                <button onClick={joinRoom}>Create Room</button>
            </form>
        </>
    )
}

export default JoinRoom