import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import useAuth from '../../hooks/useAuth'
import "./Login.css";

import { LOGIN_URL } from "../../config/URL";
import customFetch from "../../api/customFetch";

function Login() {
  // const { setAuth } = useAuth()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch(LOGIN_URL, {
        method: "POST",
        // token: localStorage.getItem('token'),
        body: JSON.stringify({ user, pwd }),
      });
      // console.log(response)
      // console.log('status', response.status)

      if (response.status === 400) {
        setErrMsg("Missing Username or Password");
        errRef.current.focus();
      } else if (response.status === 401) {
        setErrMsg("Unauthorized");
        errRef.current.focus();
      } else if (response.status === 200) {
        // const { user_id, fullname, token } = await response.json()
        const { token } = await response.json();

        // setAuth({ user, user_id, fullname, token })
        localStorage.setItem("token", token);

        // setUser('')
        // setPwd('')
        // if (from === "/") {
        //   window.location.reload()
        // } else {
        //   navigate(from, { replace: true });
        // }

        window.location.reload()
        //reference: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3
        //section: manage browser history}
      } else {
        setErrMsg("Login Failed");
        errRef.current.focus();
      }
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username/Email Id:</label>
        <input
          type="text"
          id="username"
          className="form-control form-control-lg"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          required
        />

        <label password="">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control form-control-lg"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          value={pwd}
          required
        />

        <button
          className="btn btn-primary btn-lg"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        >
          Sign In
        </button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          {/*put router link here */}
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </div>
  );
}

export default Login;
