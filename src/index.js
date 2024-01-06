import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer.js";
import PageRoutes from "./PageRoutes.js"
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <React.StrictMode>
            <BrowserRouter>
                <PageRoutes />
            </BrowserRouter>
            <Footer />
        </React.StrictMode>
    </>
)