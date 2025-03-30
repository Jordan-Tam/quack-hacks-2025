import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Header.css';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Course from '../pages/Course';

const Header = () => {
    return (
        <>
            <header className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/course/CS392">CS392</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
