import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css'

import { BASE_URL, LOGIN_URL } from '../../config/URL';

function Login() {

  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(BASE_URL + LOGIN_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pwd })
      })
      // console.log(response)
      // console.log('status', response.status)

      if (response.status === 400) {
        setErrMsg('Missing Username or Password')
        errRef.current.focus()
      }
      else if (response.status === 401) {
        setErrMsg('Unauthorized')
        errRef.current.focus()
      }
      else if (response.status === 200) 
      {
        const { user_id, fullname, accessToken } = await response.json()

        setAuth({ user, user_id, fullname, accessToken })

        setUser('')
        setPwd('')
        navigate(from, { replace: true })
        //reference: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3
        //section: manage browser history}
      }
      else {
        setErrMsg('Login Failed')
        errRef.current.focus()
      }
    } catch (err) {
      console.error(err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
  }

  return (
      <div className='App'>
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor=''>Username/Email Id:</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => { setUser(e.target.value) }}
              value={user}
              required
            />

            <label password=''>Password:</label>
            <input
              type='password'
              id='password'
              onChange={(e) => { setPwd(e.target.value) }}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </form>
          <p>
            Need an Account?<br />
            <span className='line'>
              {/*put router link here */}
              <a href='/signup'>Sign Up</a>
            </span>
          </p>
        </section>
      </div>
    )
  }

  export default Login