import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">

            <Link to="/user/student">Student</Link>
            <Link to="/user/teacher">Teacher</Link>
            <Outlet />
        </main>
    )
}

export default Layout