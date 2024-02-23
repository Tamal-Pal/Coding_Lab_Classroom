import React, { useState } from 'react'
import './HomePage.css'

function HomePage() {

  const [email_id, setemail_id] = useState('');
  const [password, setPassword] = useState('');

  const handleemail_idChange = (e) => {
    setemail_id(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/validateuser', {
      method: 'POST',
      headers: {
        email_id: email_id,
        password: password
      }
    });

    console.log(await response.json())
  }

  return (
    <div id='HomePage' className='text-center'>
      <form className="form-signin" id="signin-form">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputemail_id" className="sr-only">email_id address</label>
        <input 
          type="email" 
          id="inputemail_id" 
          className="form-control" 
          placeholder="email_id address"
          onChange={handleemail_idChange}
          required autoFocus />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input 
          type="password" 
          id="inputPassword" 
          className="form-control" 
          placeholder="Password"
          onChange={handlePasswordChange}
          required />
        <button className="btn btn-lg btn-primary btn-block" onClick={handleLogin}>Sign in</button>
      </form>
      <a href="/signup" className="link-info">Click Here to Sign up</a>
    </div>
  )
}

export default HomePage