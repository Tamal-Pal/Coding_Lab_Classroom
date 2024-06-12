import useAuth from "../../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import NavigationBar from "./NagivationBar";
import Footer from "../Footer/Footer";
import { USER_REGEX } from "../../config/REGEX";
import Login from "../Login/Login";
import * as LandingPageImage from './landing-page-image.png'
import "./Home.css";
import "react-bootstrap";

const Home = () => {
  const { auth } = useAuth();

  return USER_REGEX.test(auth.user_id) ? (
    <div className="home">
      <NavigationBar id="navbar" />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : (
    <div className="App">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
            {/* <img
              src={LandingPageImage.default}
              className="img-fluid"
              alt="Sample image"
            /> */}
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

// const Login = () => {
//   return (
//     <form>
//       <div className="form-outline mb-4">
//         <input
//           type="text"
//           id="form3Example3"
//           className="form-control form-control-lg"
//           placeholder="Enter User Name"
//         />
//         <label className="form-label" for="form3Example3">
//           User Name
//         </label>
//       </div>
//       <div className="form-outline mb-3">
//         <input
//           type="password"
//           id="form3Example4"
//           className="form-control form-control-lg"
//           placeholder="Enter password"
//           style={{ padding: "12px" }}
//         />
//         <label className="form-label" for="form3Example4">
//           Password
//         </label>
//       </div>

//       <div className="text-center text-lg-start mt-4 pt-2">
//         <button
//           type="button"
//           data-mdb-button-init
//           data-mdb-ripple-init
//           className="btn btn-primary btn-lg"
//           style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
//         >
//           Login
//         </button>
//         <p className="small fw-bold mt-2 pt-1 mb-0">
//           Don't have an account?{" "}
//           <a href="#!" className="link-dark">
//             Register
//           </a>
//         </p>
//       </div>
//     </form>
//   );
// };

// const Home = () => {
//     const { auth } = useAuth()

//     return (
//         USER_REGEX.test(auth.user_id) ?
//             (<div className='home'>
//                 <NavigationBar id='navbar' />
//                 <div className='main'>
//                     <Outlet />
//                 </div>
//                 <Footer/>
//             </div>) : (
//                 <div className='App'>
//                     <Link to='/login'>Login</Link>
//                     <Link to='/signup'>Signup</Link>
//                 </div>
//             )
//     )
// }

export default Home;
