import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Layout from './components/Layout/Layout'
import NotFound from "./components/NotFound"
import Refresh from "./components/Refresh";
import ClassRoom from "./components/ClassRoom/ClassRoom";
import Editor from "./components/Editor/Editor"
import User from "./components/User/User";

// import Footer from "./components/Footer/Footer";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route path="" element={<Refresh />} >
                    <Route path="" element={<Home />} >
                        <Route path="" element={<User />} />
                        <Route path="classroom" element={<ClassRoom />} />
                        <Route path="editor" element={<Editor />} />
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