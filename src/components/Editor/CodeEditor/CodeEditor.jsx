import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-themes-all'
import useNotebookId from '../../../hooks/useNotebookId'
import { CODE_CHANGE } from '../../../config/SocketEvent'
import useRole from '../../../hooks/useRole'
import { generateChange } from '../../../utils/codeSync'

const CodeEditor = ({ className, roomData, socket }) => {

    const [codeValue, setCodeValue] = useState()
    const notebook = useNotebookId()
    const role = useRole()

    const codeChange = useCallback((changedCodeVal, viewUpdate) => {
    
        console.log('code value', codeValue)
        var change = generateChange(codeValue, changedCodeVal);
        console.log('outside function', change)
        setCodeValue(changedCodeVal);
        socket.emit(CODE_CHANGE, { notebook, code: changedCodeVal, role, change })
    }, [notebook, socket, role]);

    useEffect(() => {

        if(socket){
            socket.on(CODE_CHANGE, ({ code }) => {
                setCodeValue(code)
            })
        }

    }, [socket])

    return <div className={`${className} code`}>
        <div style={{ flex: 1 }}>{roomData.question}</div>
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