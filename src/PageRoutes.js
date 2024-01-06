import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup/Signup";

function PageRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/signup" element={<Signup />}/>
            </Routes>
        </>
    )
}

export default PageRoutes;