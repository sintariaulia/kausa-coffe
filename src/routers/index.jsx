import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../pages/homepages';
import SignIns from '../pages/auth/signinpages';
import SignUps from '../pages/auth/signuppages';

function IndexRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignIns />} />
            <Route path='/signup' element={<SignUps />} />

        </Routes>
    </Router>
  )
}

export default IndexRouter