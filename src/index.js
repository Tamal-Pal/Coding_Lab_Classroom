import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from "./context/AuthProvider.js";
// import Footer from "./components/Footer/Footer.js";
import PageRoutes from "./PageRoutes.js"
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <PageRoutes />
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    </>
)