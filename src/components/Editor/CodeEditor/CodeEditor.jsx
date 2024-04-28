import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-themes-all'
import useNotebookId from '../../../hooks/useNotebookId'
// import useAuth from '../../../hooks/useAuth'
import { CODE_CHANGE } from '../../../config/SocketEvent'
import useRole from '../../../hooks/useRole'

const CodeEditor = ({ className, roomData, socket }) => {

    const [codeValue, setCodeValue] = useState()
    // const { auth } = useAuth()
    const notebook = useNotebookId()
    const role = useRole()

    const codeChange = useCallback((val, viewUpdate) => {
        // console.log('update', viewUpdate)
        // console.log('val:', val);
        // console.log('type', typeof(val))
        setCodeValue(val);
        socket.emit(CODE_CHANGE, { notebook, code: val, role })
    }, [notebook, socket, role]);

    useEffect(() => {

        if(socket){
            socket.on(CODE_CHANGE, ({ code }) => {
                setCodeValue(code)
            })

        }

    }, [socket])

    return <div className={`${className} code`}>
        <div style={{ flex: 1 }}><div></div>{roomData.question}</div>
        <div style={{ flex: 4, flexGrow: 1 }}>
            <CodeMirror
                className='code-editor'
                height='450px'
                value={codeValue}
                extensions={[javascript({ jsx: true })]}
                theme={vscodeDark}
                onChange={codeChange}
            />
        </div>
    </div>
}

export default CodeEditor