import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import './Login.css'

const LOGIN_URL = '/api/auth'

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
      const response = await axios.post(LOGIN_URL,
        { user, pwd },
        {
          header: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))

      const accessToken = response?.data?.accessToken;
      const user_id = response?.data?.user_id;

      setAuth({ user, pwd, user_id, accessToken })

      setUser('')
      setPwd('')
      navigate(from, { replace: true })
      //reference: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3
      //section: manage browser history

    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
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
    </>
  )
}

export default Login