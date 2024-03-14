import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Layout from './components/Layout/Layout'
import User from './components/User/User'
import Teacher from './components/User/Teacher'
import Student from './components/User/Student'
import NotFound from "./components/NotFound"
import RequireAuth from "./components/RequireAuth";
import { STU_REGEX, TCH_REGEX } from "./config/REGEX";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Layout />}>

                { /* Public Routes */}
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                { /* Protected Routes */}
                <Route element={<RequireAuth allowedRoleREGEX={STU_REGEX}/>}>
                    <Route path='user' element={<User />}>
                        <Route path='student' element={<Student />} />
                    </Route>
                </Route>

                <Route element={<RequireAuth allowedRoleREGEX={TCH_REGEX}/>}>
                    <Route path='user' element={<User />}>
                        <Route path='teacher' element={<Teacher />} />
                    </Route>
                </Route>

                { /* Catch All */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>

    </>
    )
}

export default App;