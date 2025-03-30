import Header from "../components/Header";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const Login = () => <h2>Login</h2>;

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to= "/Home">Home</Link>
                        </li>
                        <li>
                            <Link to= "/Login">Login</Link>
                        </li>
                    </ul>
                </nav>

                <Route path= "/" exact component= {Home} />
                <Route path= "/" exact component= {Login} />
            </div>
        </Router>
    );
};

export default Layout;
