import React from "react";

function Signup() {
    return (
        <>
        <br /><br /><br /><br /><br /><br /><br /><br />
            <div className="container">
                <form action='/api/signup' method='POST'>
                    <input type="email" name="email_id" id="email_id" placeholder="email_id" /> <br />
                    <input type="password" name="password" id="password" placeholder="password" /> <br />
                    <input type="text" name="full_name" id="full_name" placeholder="full_name" /> <br />
                    <input type="radio" name="role" id="teacher" value={'teacher'}/>
                    <label for="teacher">Teacher</label>
                    <br />
                    <input type="radio" name="role" id="student" value={'student'}/>
                    <label for="student">Student</label>
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Signup;