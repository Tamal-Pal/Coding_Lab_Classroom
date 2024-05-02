import React from 'react'
import './InputOutput.css'

const InputOutput = ({ className }) => {
    return <div className={`${className} io`}>
        <div>Input</div>
        <div>Output</div>
    </div>
}

export default InputOutput