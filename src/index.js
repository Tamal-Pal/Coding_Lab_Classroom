import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from "./context/AuthProvider.jsx";
// import Footer from "./components/Footer/Footer.js";
import App from "./App.jsx"
import './index.css'
import { SocketProvider } from "./context/SocketProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <BrowserRouter>
            <AuthProvider>
                <SocketProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </SocketProvider>
            </AuthProvider>
        </BrowserRouter>
    </>
)