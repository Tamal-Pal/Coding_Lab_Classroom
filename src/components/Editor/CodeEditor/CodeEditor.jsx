import React, { useState, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-themes-all'

const CodeEditor = ({ className, roomData }) => {

    const [codeValue, setCodeValue] = useState()

    const onChange = useCallback((val, viewUpdate) => {
        console.log('update', viewUpdate)
        console.log('val:', val);
        console.log('type', typeof(val))
        setCodeValue(val);
    }, []);

    return <div className={`${className} code`}>
        <div style={{ flex: 1 }}><div></div>{roomData.question}</div>
        <div style={{ flex: 4, flexGrow: 1 }}>
            <CodeMirror 
                className='code-editor'
                height='450px'
                value={codeValue} 
                extensions={[javascript({ jsx: true })]}
                theme={vscodeDark}
                onChange={onChange}
            />
        </div>
    </div>
}

export default CodeEditor