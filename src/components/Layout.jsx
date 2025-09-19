import { Link } from "react-router-dom";
import image_logo from "../assets/image_logo.png"

function Layout() {
    return (
        <div>
            <h1>Ba Thinh Vuong — Portfolio</h1>
            <nav className="navbar">
                <img src={image_logo} alt="Logo"className="logo"/>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/services">Services</Link>
                            <Link to="/contact">Contact</Link>
            </nav>
            <br />
            <hr />
        </div>
    )
}

export default Layout;