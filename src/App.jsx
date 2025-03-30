import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default App;
