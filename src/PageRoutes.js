import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Signup/Signup";

function PageRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/signup" element={<Signup />}/>
            </Routes>
        </>
    )
}

export default PageRoutes;