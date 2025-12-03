import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import image_logo from "../assets/image_logo.png"

function Layout() {
    const { user, isAuthenticated, logout } = useAuth();
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

                {/* Auth links */}
                {isAuthenticated ? (
                    <>
                      <span style={{ marginLeft: 12 }}>Hi, {user?.name || user?.email}</span>
                      <button onClick={() => { logout(); window.location.href = '/'; }} style={{ marginLeft: 8 }}>Sign out</button>
                    </>
                ) : (
                    <>
                      <Link to="/signin">Sign in</Link>
                      <Link to="/signup">Sign up</Link>
                    </>
                )}
            </nav>
            <br />
            <hr />
        </div>
    )
}

export default Layout;