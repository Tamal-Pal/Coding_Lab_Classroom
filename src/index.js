import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import Footer from "./components/Footer/Footer.js";
import PageRoutes from "./PageRoutes.js"
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <React.StrictMode>
            <BrowserRouter>
                <PageRoutes />
            </BrowserRouter>
        </React.StrictMode>
    </>
)