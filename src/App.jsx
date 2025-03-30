import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import Course from './pages/Course';
import Schedule from './pages/Schedule';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/course/:courseCode" element={<Course />}></Route>
                <Route path="/schedule" element={<Schedule />}></Route>
            </Routes>
        </div>
    );
};

export default App;
