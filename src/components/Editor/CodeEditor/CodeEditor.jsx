import React from 'react'

const CodeEditor = ({ className, roomData }) => {
    return <div className={`${className} code`}>
        <div style={{ flex: 1 }}>{roomData.question}</div>
        <div style={{ flex: 4 }}>Code</div>
    </div>
}

export default CodeEditor