import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Layout from './components/Layout/Layout'
import UserLayout from './components/User/UserLayout'
import Teacher from './components/User/Teacher'
import Student from './components/User/Student'
import NotFound from "./components/NotFound"
import RequireAuth from "./components/RequireAuth";
import { STU_REGEX, TCH_REGEX } from "./config/REGEX";

import 'bootstrap/dist/css/bootstrap.min.css'
// import Footer from "./components/Footer/Footer";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Layout />}>

                { /* Public Routes */}
                <Route path="" element={<Home />}>
                    { /* Protected Routes */}
                    <Route element={<RequireAuth allowedRoleREGEX={STU_REGEX}/>}>
                        <Route path='user' element={<UserLayout />}>
                            <Route path='student' element={<Student />} />
                        </Route>
                    </Route>

                    <Route element={<RequireAuth allowedRoleREGEX={TCH_REGEX}/>}>
                        <Route path='user' element={<UserLayout />}>
                            <Route path='teacher' element={<Teacher />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />


                { /* Catch All */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>

        {/* <Footer /> */}

    </>
    )
}

export default App;