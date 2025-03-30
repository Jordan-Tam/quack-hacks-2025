import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Navbar.css';
const Home = () => <h2>Home</h2>
const Login = () => <h2>Login</h2>
const Header = () => {
    return (
        <>
            <header>
                <Router>
                    <div>
                        <nav>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/about">About</Link>
                            </li>
                            <li>
                            <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                        </nav>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/contact" component={Contact} />
                    </div>
                </Router>

            </header>
        </>
    );
};

export default Header;
