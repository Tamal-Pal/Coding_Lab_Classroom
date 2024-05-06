import React, { useRef } from 'react'
import './InputOutput.css'

const InputOutput = ({ className }) => {

    const inputRef = useRef()
    const outputRef = useRef()

    const submitInput = () => {
        console.log(inputRef.current.textContent)
    }

    return (        
        <div className={`${className} io`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '0 0 50%' }} className='input-parent'>
                <span>Input</span>
                <a className='run-button' onClick={submitInput}>
                    <i className="bi bi-play-fill"></i>
                </a>
                <div ref={inputRef} className='input' contentEditable='true'></div>
            </div>
            <div className='output-parent' style={{ flex: '0 0 50%' }}>
                <div>Output</div>
                <div ref={outputRef} className='output'></div>
            </div>
        </div>
    )
}

export default InputOutput