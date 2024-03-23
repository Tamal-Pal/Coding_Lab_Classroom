import React from 'react'
import useQuery from '../../../../hooks/useQuery'

const Editor = () => {
    const query = useQuery()
    const room_id = query.get('room_id')
    const student_id = query.get('student_id')

    return (
        <div>Editor,<br />RoomId: {room_id}<br />Student Id: {student_id}</div>
    )
}

export default Editor