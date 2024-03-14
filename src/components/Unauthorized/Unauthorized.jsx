import React from 'react'
import { useNavigate } from 'react-router-dom'

function Unauthorized() {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    return (<>
        <div>Unauthorized</div>
        <div className='flexGrow'>
            <button onClick={goBack}>Go Back</button>
        </div>

    </>
    )
}

export default Unauthorized