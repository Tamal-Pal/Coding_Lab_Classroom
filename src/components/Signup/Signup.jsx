import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Signup.css'
import { SIGNUP_URL } from '../../config/URL';
import customFetch from '../../api/customFetch';
import { FULLNAME_REGEX, USER_NAME_REGEX, PWD_REGEX } from '../../config/REGEX';

function Signup() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [fullname, setFullname] = useState('');
    const [validFullname, setValidFullname] = useState(false);
    const [fullnameFocus, setFullnameFocus] = useState(false);

    const [role, setRole] = useState(false);
    const [validRole, setValidRole] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = FULLNAME_REGEX.test(fullname);
        // console.log(result);
        // console.log(fullname);
        setValidFullname(result);
    }, [fullname]);

    useEffect(() => {
        const result = USER_NAME_REGEX.test(user);
        // console.log(result);
        // console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        if (role) setValidRole(true)
        else setValidRole(false)
    }, [role])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleRole = (e) => {
        setRole(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_NAME_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await customFetch(SIGNUP_URL, {
                method: 'POST',
                body: JSON.stringify({ fullname: fullname, user: user, role: role, pwd: pwd })
            })
            // console.log(response.status)

            if(response.status === 200 || response.status === 201){
                setSuccess(true)
            }
            else if(response.status === 409){
                setErrMsg('Username Taken')
            }
            else {
                setErrMsg('Registration Failed')
            }
        }
        catch (err) {
            setErrMsg('No Response From Server')
            errRef.current.focus();
        }
    }

    return (
        <div className='App'>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='/login'>Sign In</a>
                        <br />
                        <a href='/signup'>Sign Up</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                        {errMsg}
                    </p>

                    <h1>Register</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='fullname'>
                            Full Name:
                            <span className={validFullname ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validFullname || !fullname ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='text'
                            id='fullname'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setFullname(e.target.value)}
                            required
                            aria-invalid={validFullname ? "false" : "true"}
                            aria-describedby='fnamenote'
                            onFocus={() => setFullnameFocus(true)}
                            onBlur={() => setFullnameFocus(false)}
                        />
                        <p id='fnamenote' className={fullnameFocus && fullname && !validFullname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Full name cannot be empty
                        </p>

                        <label htmlFor='username'>
                            User Name:
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='text'
                            id='username'
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <div className='radio' id='radio-container'>

                            <span className=''>
                                <label htmlFor='student'>Student&nbsp;</label>
                                <input type='radio' id='student' name='role' value='student' onChange={handleRole} required />
                            </span>
                            <span className=''>
                                <label htmlFor='teacher'>Teacher&nbsp;</label>
                                <input type='radio' id='teacher' name='role' value='teacher' onChange={handleRole} required />
                            </span>
                        </div>

                        <label htmlFor='password'>
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id='pwdnote' className={pwdFocus && user && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special character. <br />
                            Allowed special characters:
                            <span aria-label='exclamation mark'>!</span>
                            <span aria-label='at symbol'>@</span>
                            <span aria-label='hashtag'>#</span>
                            <span aria-label='dollar sign'>$</span>
                            <span aria-label='percent'>%</span>
                        </p>

                        <label htmlFor='confirm_pwd'>
                            Confirm Password:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='password'
                            id='confirm_pwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button
                            type='submit'
                            disabled={!validFullname || !validName || !validRole || !validPwd || !validMatch ? true : false}
                        >
                            Sign Up
                        </button>
                    </form>

                    <p>
                        Already registered?<br />
                        <span className='line'>
                            {/* put router link here*/}
                            <a href='/'>Sign In</a>
                        </span>
                    </p>
                </section>

            )}
        </div>
    )
}

export default Signup;