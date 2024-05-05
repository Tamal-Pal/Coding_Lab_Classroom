import React from 'react'
import useRole from '../../../hooks/useRole'

const Messages = ({ messages }) => {
    const role = useRole()
    // console.log(messages)
    return (
        <>
            {
                Array.isArray(messages) && messages?.map((message, key) => {
                    return (
                        <div className='message-parent' key={key}>
                            <div className={`message ${(message[0] === role) ? 'mine' : 'their'}`}>{message[1]}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Messages